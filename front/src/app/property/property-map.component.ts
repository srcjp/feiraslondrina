import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { saleIcon, rentIcon } from './map-icon';
import Supercluster from 'supercluster';
import { PropertyService, PropertyListing } from './property.service';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyPropertiesDialogComponent } from './my-properties-dialog.component';
import { PropertyPopupComponent } from './property-popup.component';
import { ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { PropertyFormComponent } from './property-form.component';

@Component({
  selector: 'app-property-map',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    TranslateModule,
    PropertyPopupComponent
  ],
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.scss']
})
export class PropertyMapComponent implements OnInit {
  private map?: L.Map;
  private cluster?: Supercluster<{ property: PropertyListing }>;
  private clusterLayer = L.layerGroup();
  properties: PropertyListing[] = [];
  filteredProperties: PropertyListing[] = [];
  myProperties: PropertyListing[] = [];
  private myPropertiesDialog?: MatDialogRef<MyPropertiesDialogComponent>;

  statusFilter: string = '';
  periodFilter: number | '' = '';

  constructor(
    private service: PropertyService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private vcr: ViewContainerRef,
    private injector: EnvironmentInjector,
    private router: Router
  ) {}

  get loggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  ngOnInit() {
    this.service.list().subscribe({
      next: properties => {
        this.properties = properties;
        this.applyFilters();
        this.initMap();
      },
      error: () => this.initMap()
    });

    if (this.loggedIn) {
      this.service.myList().subscribe({
        next: p => (this.myProperties = p),
        error: () => {}
      });
    }
  }

  private initMap() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords: L.LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
      this.map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
      this.map.addLayer(this.clusterLayer);
      this.loadMarkers();

      }, () => {
        // Default to Londrina if geolocation fails
        const coords: L.LatLngTuple = [-23.31, -51.17];
        this.map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
      this.map.addLayer(this.clusterLayer);
      this.loadMarkers();
    });
  }

  private loadMarkers() {
    if(!this.map || !this.cluster) return;
    this.clusterLayer.clearLayers();
    this.updateClusters();
    this.map.on('moveend zoomend', () => this.updateClusters());
  }

  private buildCluster(){
    const points = this.filteredProperties
      .filter(p => p.latitude && p.longitude)
      .map(p => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [p.longitude!, p.latitude!] },
        properties: { property: p }
      }));

    this.cluster = new Supercluster({ radius: 40, maxZoom: 18 });
    this.cluster.load(points as any);
  }

  private updateClusters(){
    if(!this.map || !this.cluster) return;
    this.clusterLayer.clearLayers();
    const bounds = this.map.getBounds();
    const zoom = this.map.getZoom();
    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth()
    ];
    const clusters = this.cluster.getClusters(bbox, zoom);
    for(const c of clusters){
      const [lng, lat] = c.geometry.coordinates as [number, number];
      if((c.properties as any).cluster){
        const count = (c.properties as any).point_count as number;
        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            html: `<div class="cluster-icon">${count}</div>`,
            className: '',
            iconSize: [30,30]
          })
        });
        marker.on('click', () => {
          if (c.id === undefined) return;
          const expansionZoom = this.cluster!.getClusterExpansionZoom(+c.id);
          this.map!.setView([lat, lng], expansionZoom);
        });
        this.clusterLayer.addLayer(marker);
      } else {
        const property = (c.properties as any).property as PropertyListing;
        const icon = property.status === 'RENT' ? rentIcon : saleIcon;
        const marker = L.marker([lat, lng], { icon });
        const popupHost = document.createElement('div');
        const compRef = this.vcr.createComponent(PropertyPopupComponent, {
          environmentInjector: this.injector
        });
        compRef.instance.property = property;
        popupHost.appendChild(compRef.location.nativeElement);
        marker.bindPopup(popupHost, { className: 'property-popup', maxWidth: 260 });
        marker.on('popupclose', () => compRef.destroy());
        this.clusterLayer.addLayer(marker);
      }
    }
  }

  applyFilters(){
    let filtered = this.properties;
    if(this.statusFilter){
      filtered = filtered.filter(p => p.status === this.statusFilter);
    }
    if(this.periodFilter !== ''){
      const limit = new Date();
      limit.setDate(limit.getDate() - +this.periodFilter);
      filtered = filtered.filter(p => {
        return p.date ? new Date(p.date) >= limit : false;
      });
    }
    this.filteredProperties = filtered;
    this.buildCluster();
    if(this.map){
      this.updateClusters();
    }
  }

  openMyProperties() {
    this.myPropertiesDialog = this.dialog.open(MyPropertiesDialogComponent, {
      width: '90vw',
      maxWidth: '90vw',
      data: { properties: this.myProperties }
    });

    this.myPropertiesDialog.afterClosed().subscribe(result => {
      if (result && result.edit) {
        this.openPropertyForm(result.edit);
      } else if (result) {
        this.reloadProperties();
      }
    });
  }

  private reloadProperties() {
    this.service.list().subscribe({
      next: properties => {
        this.properties = properties;
        this.applyFilters();
        this.updateClusters();
      }
    });

    if (this.loggedIn) {
      this.service.myList().subscribe({
        next: p => {
          this.myProperties = p;
          if (this.myPropertiesDialog) {
            this.myPropertiesDialog.componentInstance.data.properties = this.myProperties;
          }
        },
        error: () => {}
      });
    }
  }

  handleAddProperty() {
    if (this.loggedIn) {
      this.openPropertyForm();
    } else {
      this.router.navigate(['/login']);
    }
  }

  openPropertyForm(id?: number) {
    this.dialog
      .open(PropertyFormComponent, {
        width: '95vw',
        maxWidth: '95vw',
        data: id ? { id } : undefined
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.reloadProperties();
        }
      });
  }

  remove(p: PropertyListing){
    if(!p.id) return;
    this.service.delete(p.id).subscribe(()=>{
      this.myProperties = this.myProperties.filter(m => m.id !== p.id);
    });
  }

  onImageChange(event: any, p: PropertyListing){
    if(!p.id) return;
    const files: FileList = event.target.files;
    const data = new FormData();
    data.append('status', p.status);
    if(p.name) data.append('name', p.name);
    if(p.date) data.append('date', p.date);
    if(p.breed) data.append('breed', p.breed);
    if(p.size) data.append('size', p.size);
    if(p.color) data.append('color', p.color);
    if(p.observation) data.append('observation', p.observation);
    if(p.phone) data.append('phone', p.phone);
    if(p.latitude) data.append('latitude', ''+p.latitude);
    if(p.longitude) data.append('longitude', ''+p.longitude);
    Array.from(files).slice(0,3).forEach(f => data.append('images', f));
    this.service.update(p.id, data).subscribe(r => {
      p.images = r.images;
    });
  }
}

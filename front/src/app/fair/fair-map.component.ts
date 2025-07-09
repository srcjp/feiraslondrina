import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  EnvironmentInjector,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import * as L from "leaflet";
import Supercluster from "supercluster";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "assets/leaflet/marker-icon-2x.png",
  iconUrl: "assets/leaflet/marker-icon.png",
  shadowUrl: "assets/leaflet/marker-shadow.png",
});
import { FairService, Fair, FairType } from "./fair.service";
import { RouterModule, Router } from "@angular/router";
import { MapStateService } from "./map-state.service";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { FairPopupComponent } from "./fair-popup.component";

@Component({
  selector: "app-fair-map",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: "./fair-map.component.html",
  styleUrls: ["./fair-map.component.scss"],
})
export class FairMapComponent implements OnInit, OnDestroy {
  private map?: L.Map;
  private cluster?: any;
  private clusterLayer = L.layerGroup();
  private markerMap = new Map<number, L.Marker>();
  private pendingFairId?: number;
  fairs: Fair[] = [];
  filtered: Fair[] = [];
  day = "";
  daysOfWeek = [
    { value: "", label: "Todos" },
    { value: "Domingo", label: "Domingo" },
    { value: "Segunda", label: "Segunda-feira" },
    { value: "Terça", label: "Terça-feira" },
    { value: "Quarta", label: "Quarta-feira" },
    { value: "Quinta", label: "Quinta-feira" },
    { value: "Sexta", label: "Sexta-feira" },
    { value: "Sábado", label: "Sábado" },
  ];

  types = Object.values(FairType);
  selectedTypes: FairType[] = [...this.types];
  isMobile = false;
  filtersVisible = true;

  constructor(
    private service: FairService,
    private router: Router,
    private vcr: ViewContainerRef,
    private injector: EnvironmentInjector,
    private mapState: MapStateService,
  ) {}

  private getIcon(type?: FairType): L.Icon {
    let icon = 'assets/leaflet/feiragenerica.png';
    switch (type) {
      case FairType.FESTA_JUNINA:
        icon = 'assets/leaflet/festajunina.png';
        break;
      case FairType.PASTEL:
        icon = 'assets/leaflet/pastel.png';
        break;
      case FairType.FEIRA_DA_LUA:
        icon = 'assets/leaflet/feiradalua.png';
        break;
      case FairType.FEIRA_GENERICA:
        icon = 'assets/leaflet/feiragenerica.png';
        break;
    }
    return L.icon({
      iconUrl: icon,
      iconSize: [50, 82],
      iconAnchor: [25, 82],
      popupAnchor: [0, -82],
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }

  iconUrl(type: FairType): string {
    switch (type) {
      case FairType.FESTA_JUNINA:
        return 'assets/leaflet/festajunina.png';
      case FairType.PASTEL:
        return 'assets/leaflet/pastel.png';
      case FairType.FEIRA_DA_LUA:
        return 'assets/leaflet/feiradalua.png';
      case FairType.FEIRA_GENERICA:
      default:
        return 'assets/leaflet/feiragenerica.png';
    }
  }

  get loggedIn(): boolean {
    return !!localStorage.getItem("accessToken");
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 600;
    this.filtersVisible = !this.isMobile;
    this.service.list().subscribe((fairs) => {
      this.fairs = fairs;
      this.filtered = fairs;
      this.initMap();
    });
  }

  private initMap() {
    const setupMap = (coords: L.LatLngTuple, zoom = 13) => {
      this.map = L.map("map").setView(coords, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.map);
      this.map.addLayer(this.clusterLayer);
      this.buildCluster();
      this.updateClusters();
      this.map.on("moveend zoomend", () => this.updateClusters());
      this.map.on("moveend", () => {
        if (this.pendingFairId !== undefined) {
          const id = this.pendingFairId;
          this.pendingFairId = undefined;
          const m = this.markerMap.get(id);
          m?.openPopup();
        }
      });
    };

    if (this.mapState.lat !== undefined && this.mapState.lng !== undefined && this.mapState.zoom !== undefined) {
      setupMap([this.mapState.lat, this.mapState.lng], this.mapState.zoom);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setupMap([pos.coords.latitude, pos.coords.longitude], 13);
        },
        () => {
          setupMap([-23.31, -51.17], 13);
        }
      );
    }
  }

  private buildCluster() {
    const points = this.filtered
      .filter((f) => f.latitude && f.longitude)
      .map((f) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [f.longitude!, f.latitude!] },
        properties: { fair: f },
      }));

    this.cluster = new Supercluster({ radius: 40, maxZoom: 18 });
    this.cluster.load(points as any);
  }

  private updateClusters() {
    if (!this.map || !this.cluster) return;
    this.clusterLayer.clearLayers();
    this.markerMap.clear();
    const bounds = this.map.getBounds();
    const zoom = this.map.getZoom();
    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];
    const clusters = this.cluster.getClusters(bbox, zoom);
    for (const c of clusters) {
      const [lng, lat] = c.geometry.coordinates as [number, number];
      if ((c.properties as any).cluster) {
        const count = (c.properties as any).point_count as number;
        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            html: `<div class="cluster-icon">${count}</div>`,
            className: "",
            iconSize: [30, 30],
          }),
        });
        marker.on("click", () => {
          if (c.id === undefined) return;
          const expansionZoom = this.cluster!.getClusterExpansionZoom(+c.id);
          this.map!.setView([lat, lng], expansionZoom);
        });
        this.clusterLayer.addLayer(marker);
      } else {
        const fair = (c.properties as any).fair as Fair;
        const marker = L.marker([lat, lng], { icon: this.getIcon(fair.type) });
        this.markerMap.set(fair.id!, marker);
        if (this.isMobile) {
          marker.on('click', () => {
            this.pendingFairId = fair.id;
            this.map?.setView([lat, lng], this.map.getZoom());
          });
        }
        marker.bindPopup("", {
          className: "fair-popup",
          maxWidth: 300,
          autoPan: false,
        });
        marker.on("popupopen", () => {
          const popupHost = document.createElement("div");
          const compRef = this.vcr.createComponent(FairPopupComponent, {
            environmentInjector: this.injector,
          });
          compRef.instance.fair = fair;
          popupHost.appendChild(compRef.location.nativeElement);
          marker.setPopupContent(popupHost);
          marker.once("popupclose", () => compRef.destroy());
        });
        this.clusterLayer.addLayer(marker);
      }
    }
  }

  applyFilter() {
    const d = this.day.toLowerCase();
    this.filtered = this.fairs.filter((f) => {
      const dayMatch = !this.day || f.schedule?.toLowerCase().includes(d);
      const typeMatch = !f.type || this.selectedTypes.includes(f.type);
      return dayMatch && typeMatch;
    });
    this.buildCluster();
    this.updateClusters();
  }

  toggleType(type: FairType, checked: boolean) {
    if (checked) {
      if (!this.selectedTypes.includes(type)) {
        this.selectedTypes.push(type);
      }
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
    this.applyFilter();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  addFair() {
    this.router.navigate(["/fair/new"]);
  }

  ngOnDestroy() {
    if (this.map) {
      const center = this.map.getCenter();
      this.mapState.setState(center.lat, center.lng, this.map.getZoom());
    }
  }
}

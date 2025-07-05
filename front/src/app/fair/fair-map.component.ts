import { Component, OnInit, ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { FairService, Fair } from './fair.service';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { FairPopupComponent } from './fair-popup.component';

@Component({
  selector: 'app-fair-map',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TranslateModule, FairPopupComponent],
  templateUrl: './fair-map.component.html',
  styleUrls: ['./fair-map.component.scss']
})
export class FairMapComponent implements OnInit {
  private map?: L.Map;
  fairs: Fair[] = [];

  constructor(
    private service: FairService,
    private router: Router,
    private vcr: ViewContainerRef,
    private injector: EnvironmentInjector
  ) {}

  get loggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  ngOnInit() {
    this.service.list().subscribe(fairs => {
      this.fairs = fairs;
      this.initMap();
    });
  }

  private initMap() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords: L.LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
      this.map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
      this.loadMarkers();
    }, () => {
      const coords: L.LatLngTuple = [-23.31, -51.17];
      this.map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
      this.loadMarkers();
    });
  }

  private loadMarkers() {
    if (!this.map) return;
    this.fairs.forEach(f => {
      if (f.latitude && f.longitude) {
        const marker = L.marker([f.latitude, f.longitude]).addTo(this.map!);
        let compRef: any;
        marker.on('click', () => {
          if (compRef) {
            compRef.destroy();
          }
          const popupHost = document.createElement('div');
          compRef = this.vcr.createComponent(FairPopupComponent, {
            environmentInjector: this.injector
          });
          compRef.instance.fair = f;
          popupHost.appendChild(compRef.location.nativeElement);
          marker.bindPopup(popupHost, { className: 'fair-popup', maxWidth: 260 }).openPopup();
        });
        marker.on('popupclose', () => {
          if (compRef) {
            compRef.destroy();
            compRef = null;
          }
        });
      }
    });
  }

  addFair() {
    this.router.navigate(['/fair/new']);
  }
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapStateService {
  lat?: number;
  lng?: number;
  zoom?: number;

  setState(lat: number, lng: number, zoom: number) {
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
  }
}

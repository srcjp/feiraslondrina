import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropertyService, PropertyListing } from './property.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EnumLabelPipe } from './enum-label.pipe';
import * as L from 'leaflet';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    EnumLabelPipe
  ],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property?: PropertyListing;
  images: string[] = [];
  currentImage = 0;
  selectedImage?: string;
  private enumPipe = new EnumLabelPipe();
  private map?: L.Map;

  getEnumLabels(items?: string[]): string {
    return items?.map(i => this.enumPipe.transform(i)).join(', ') || '';
  }

  constructor(private service: PropertyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.service.get(id).subscribe(p => {
        this.property = p;
        this.images = p.images || [];
        if (p.latitude && p.longitude) {
          setTimeout(() => this.initMap(p.latitude!, p.longitude!), 0);
        }
      });
    }
  }

  nextImage() {
    if (this.images.length) {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }
  }

  prevImage() {
    if (this.images.length) {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    }
  }

  openImage(url: string) {
    this.selectedImage = url;
  }

  closeImage() {
    this.selectedImage = undefined;
  }

  private initMap(lat: number, lng: number) {
    this.map = L.map('detailMap').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
    L.marker([lat, lng]).addTo(this.map);
  }
}

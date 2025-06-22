import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropertyService, PropertyListing } from './property.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { EnumLabelPipe } from './enum-label.pipe';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TranslateModule, EnumLabelPipe],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property?: PropertyListing;
  displayImages: string[] = [];
  extraImages: string[] = [];
  currentImage = 0;
  private enumPipe = new EnumLabelPipe();

  getEnumLabels(items?: string[]): string {
    return items?.map(i => this.enumPipe.transform(i)).join(', ') || '';
  }

  constructor(private service: PropertyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.service.get(id).subscribe(p => {
        this.property = p;
        if (p.images) {
          this.displayImages = p.images.slice(0, 6);
          this.extraImages = p.images.slice(6);
        }
      });
    }
  }

  nextImage() {
    if (this.extraImages.length) {
      this.currentImage = (this.currentImage + 1) % this.extraImages.length;
    }
  }

  prevImage() {
    if (this.extraImages.length) {
      this.currentImage = (this.currentImage - 1 + this.extraImages.length) % this.extraImages.length;
    }
  }
}

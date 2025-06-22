import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PropertyListing } from './property.service';
import { EnumLabelPipe } from './enum-label.pipe';

@Component({
  selector: 'app-property-popup',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, TranslateModule, EnumLabelPipe],
  templateUrl: './property-popup.component.html',
  styleUrls: ['./property-popup.component.scss']
})
export class PropertyPopupComponent {
  @Input() property!: PropertyListing;
  currentImage = 0;

  phoneDigits(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  nextImage(event?: Event) {
    event?.stopPropagation();
    if (this.property.images?.length) {
      this.currentImage = (this.currentImage + 1) % this.property.images.length;
    }
  }

  prevImage(event?: Event) {
    event?.stopPropagation();
    if (this.property.images?.length) {
      this.currentImage = (this.currentImage - 1 + this.property.images.length) % this.property.images.length;
    }
  }
}

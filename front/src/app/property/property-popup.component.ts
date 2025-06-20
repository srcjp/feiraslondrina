import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PropertyListing } from './property.service';

@Component({
  selector: 'app-property-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './property-popup.component.html',
  styleUrls: ['./property-popup.component.scss']
})
export class PropertyPopupComponent {
  @Input() property!: PropertyListing;

  phoneDigits(phone: string): string {
    return phone.replace(/\D/g, '');
  }
}

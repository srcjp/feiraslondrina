import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fair } from './fair.service';

@Component({
  selector: 'app-fair-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fair-popup.component.html',
  styleUrls: ['./fair-popup.component.scss']
})
export class FairPopupComponent {
  @Input() fair!: Fair;
}

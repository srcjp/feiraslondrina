import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Fair } from './fair.service';

@Component({
  selector: 'app-fair-popup',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TranslateModule],
  templateUrl: './fair-popup.component.html',
  styleUrls: ['./fair-popup.component.scss']
})
export class FairPopupComponent {
  @Input() fair!: Fair;
}

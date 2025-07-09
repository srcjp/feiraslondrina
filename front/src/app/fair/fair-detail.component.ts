import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { FairService, Fair } from './fair.service';
import { AttractionService, Attraction } from './attraction.service';

@Component({
  selector: 'app-fair-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule, TranslateModule],
  templateUrl: './fair-detail.component.html',
  styleUrls: ['./fair-detail.component.scss']
})
export class FairDetailComponent implements OnInit {
  fair?: Fair;
  attractions: Attraction[] = [];

  constructor(
    private route: ActivatedRoute,
    private fairService: FairService,
    private attractionService: AttractionService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fairService.get(id).subscribe(f => (this.fair = f));
      this.attractionService.listByFair(id).subscribe(list => (this.attractions = list));
    }
  }

  formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  goBack() {
    this.location.back();
  }

}

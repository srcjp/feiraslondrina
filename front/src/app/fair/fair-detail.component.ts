import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { FairService, Fair } from './fair.service';
import { AttractionService, Attraction } from './attraction.service';

@Component({
  selector: 'app-fair-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TranslateModule],
  templateUrl: './fair-detail.component.html',
  styleUrls: ['./fair-detail.component.scss']
})
export class FairDetailComponent implements OnInit {
  fair?: Fair;
  attractions: Attraction[] = [];

  constructor(
    private route: ActivatedRoute,
    private fairService: FairService,
    private attractionService: AttractionService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fairService.get(id).subscribe(f => (this.fair = f));
      this.attractionService.listByFair(id).subscribe(list => (this.attractions = list));
    }
  }
}

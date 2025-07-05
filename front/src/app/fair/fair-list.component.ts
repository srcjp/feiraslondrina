import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { FairService, Fair } from './fair.service';

@Component({
  selector: 'app-fair-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslateModule
  ],
  templateUrl: './fair-list.component.html',
  styleUrls: ['./fair-list.component.scss']
})
export class FairListComponent implements OnInit {
  fairs: Fair[] = [];
  filtered: Fair[] = [];
  day = '';

  daysOfWeek = [
    { value: '', label: 'Todos' },
    { value: 'Domingo', label: 'Domingo' },
    { value: 'Segunda', label: 'Segunda-feira' },
    { value: 'Terça', label: 'Terça-feira' },
    { value: 'Quarta', label: 'Quarta-feira' },
    { value: 'Quinta', label: 'Quinta-feira' },
    { value: 'Sexta', label: 'Sexta-feira' },
    { value: 'Sábado', label: 'Sábado' }
  ];

  constructor(private service: FairService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.myList().subscribe(list => {
      this.fairs = list;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (!this.day) {
      this.filtered = this.fairs;
    } else {
      const d = this.day.toLowerCase();
      this.filtered = this.fairs.filter(f => f.schedule?.toLowerCase().includes(d));
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }
}

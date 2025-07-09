import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FairService, Fair, FairType } from './fair.service';
import * as L from 'leaflet';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon-2x.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png'
});
L.Icon.Default.imagePath = 'assets/leaflet/';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';
import { AttractionService, Attraction } from './attraction.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fair-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    TranslateModule,
    NgxMaskDirective
  ],
  templateUrl: './fair-form.component.html',
  styleUrls: ['./fair-form.component.scss']
})
export class FairFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  private map?: L.Map;
  private marker?: L.Marker;
  imageFile?: File;
  imageUrl?: string;
  id?: number;
  attractions: Attraction[] = [];
  types = Object.values(FairType);
  daysOfWeek = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ];

  constructor(
    private fb: FormBuilder,
    private service: FairService,
    private attractionService: AttractionService,
    private router: Router,
    private route: ActivatedRoute,
    @Optional() public dialogRef?: MatDialogRef<FairFormComponent>,
    @Inject(MAT_DIALOG_DATA) @Optional() data?: { id?: number }
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      description: [''],
      schedule: [''],
      openingHours: [''],
      socialMedia: [''],
      responsible: [''],
      phone: [''],
      type: [FairType.FEIRA_GENERICA],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    });
    if (data && data.id) {
      this.id = data.id;
    }
  }

  ngOnInit(): void {
    const paramId = this.id ?? this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.service.get(this.id).subscribe(fair => {
        this.form.patchValue(fair);
        if (fair.latitude && fair.longitude) {
          this.setMarker([fair.latitude, fair.longitude]);
        }
        if (fair.imagePath) {
          this.imageUrl = fair.imagePath;
        }
        this.attractions = fair.attractionList ?? [];
      });
    }
    this.initMap();
  }

  private initMap() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords: L.LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
      this.map = L.map('selectMap').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
      this.map.on('click', e => this.onMapClick(e as L.LeafletMouseEvent));
      this.setMarkerIfValid();
    }, () => {
      const coords: L.LatLngTuple = [-23.31, -51.17];
      this.map = L.map('selectMap').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
      this.map.on('click', e => this.onMapClick(e as L.LeafletMouseEvent));
      this.setMarkerIfValid();
    });
  }

  private setMarkerIfValid() {
    if (this.form.value.latitude && this.form.value.longitude) {
      this.setMarker([this.form.value.latitude, this.form.value.longitude]);
    }
  }

  private setMarker(coords: L.LatLngTuple) {
    if (this.marker) {
      this.marker.setLatLng(coords);
    } else {
      this.marker = L.marker(coords).addTo(this.map!);
    }
    this.map!.setView(coords, 13);
  }

  private onMapClick(ev: L.LeafletMouseEvent) {
    this.setMarker([ev.latlng.lat, ev.latlng.lng]);
    this.form.patchValue({ latitude: ev.latlng.lat, longitude: ev.latlng.lng });
  }

  onFile(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imageUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  addAttraction() {
    this.attractions.push({ name: '', specialty: '', socialMedia: '' });
  }

  removeAttraction(index: number) {
    const a = this.attractions[index];
    if (a.id) {
      this.attractionService.delete(a.id).subscribe(() => this.attractions.splice(index, 1));
    } else {
      this.attractions.splice(index, 1);
    }
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  submit() {
    this.loading = true;
    const data = new FormData();
    for (const key in this.form.value) {
      const val = (this.form.value as any)[key];
      if (val !== null && val !== undefined) {
        data.append(key, '' + val);
      }
    }
    if (this.imageFile) {
      data.append('image', this.imageFile);
    }
    const finish = () => {
      this.loading = false;
      if (this.dialogRef) {
        this.dialogRef.close(true);
      } else {
        this.router.navigate(['/fair']);
      }
    };

    const saveAttractions = (fairId: number) => {
      if (!this.attractions.length) {
        finish();
        return;
      }
      const calls = this.attractions.map(a =>
        a.id ? this.attractionService.update(a.id, a) : this.attractionService.create(fairId, a)
      );
      forkJoin(calls).subscribe(() => finish());
    };

    const handle = (obs: any) => {
      obs.subscribe((f: Fair) => saveAttractions(f.id!));
    };

    if (this.id) {
      handle(this.service.update(this.id, data));
    } else {
      handle(this.service.create(data));
    }
  }
}

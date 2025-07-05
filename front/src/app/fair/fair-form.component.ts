import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FairService, Fair } from './fair.service';
import * as L from 'leaflet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fair-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './fair-form.component.html',
  styleUrls: ['./fair-form.component.scss']
})
export class FairFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  private map?: L.Map;
  private marker?: L.Marker;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: FairService,
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
      socialMedia: [''],
      attractions: [''],
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
      this.service.get(this.id).subscribe(f => {
        this.form.patchValue(f);
        if (f.latitude && f.longitude) {
          this.setMarker([f.latitude, f.longitude]);
        }
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

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  submit() {
    this.loading = true;
    const data: Fair = this.form.value;
    const handle = (obs: any) => {
      obs.subscribe(() => {
        this.loading = false;
        if (this.dialogRef) {
          this.dialogRef.close(true);
        } else {
          this.router.navigate(['/fair']);
        }
      });
    };

    if (this.id) {
      handle(this.service.update(this.id, data));
    } else {
      handle(this.service.create(data));
    }
  }
}

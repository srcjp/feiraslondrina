import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PropertyListing, PropertyService } from './property.service';

@Component({
  selector: 'app-my-properties-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './my-properties-dialog.component.html',
  styleUrls: ['./my-properties-dialog.component.scss']
})
export class MyPropertiesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MyPropertiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { properties: PropertyListing[] },
    private service: PropertyService
  ) {}

  close() {
    this.dialogRef.close();
  }

  remove(p: PropertyListing) {
    if (!p.id) return;
    this.service.delete(p.id).subscribe(() => {
      p.deleted = true;
    });
  }

  edit(p: PropertyListing) {
    if (!p.id) return;
    this.dialogRef.close({ edit: p.id });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import { DialogData, DialogDataEdit, DialogDataCreate } from '../mapIncendios.component';

@Component({
  selector: 'app-crearIncendioDialog',
  templateUrl: './crearIncendioDialog.component.html',
  styleUrls: ['./crearIncendioDialog.component.css']
})
export class CrearIncendioDialogComponent implements OnInit {
  estaRelleno;
  constructor(
    public dialogRef: MatDialogRef<CrearIncendioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreate
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

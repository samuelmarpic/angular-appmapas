import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import { DialogData, DialogDataEdit } from '../mapIncendios.component';

@Component({
  selector: 'app-editarIncendioDialog',
  templateUrl: './editarIncendioDialog.component.html',
  styleUrls: ['./editarIncendioDialog.component.css']
})
export class EditarIncendioDialogComponent implements OnInit {
  nom = this.data.objeto.nombre;
  constructor(
    public dialogRef: MatDialogRef<EditarIncendioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit
  ) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

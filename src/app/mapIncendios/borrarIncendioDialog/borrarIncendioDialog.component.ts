import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import { DialogData } from '../mapIncendios.component';

@Component({
  selector: 'app-borrarIncendioDialog',
  templateUrl: './borrarIncendioDialog.component.html',
  styleUrls: ['./borrarIncendioDialog.component.css']
})
export class BorrarIncendioDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BorrarIncendioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  si(): void {
    this.dialogRef.close(this.data.borrar=true);
  }
}

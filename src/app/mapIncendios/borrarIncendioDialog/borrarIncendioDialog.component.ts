import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-borrarIncendioDialog',
  templateUrl: './borrarIncendioDialog.component.html',
  styleUrls: ['./borrarIncendioDialog.component.css']
})
export class BorrarIncendioDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BorrarIncendioDialogComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

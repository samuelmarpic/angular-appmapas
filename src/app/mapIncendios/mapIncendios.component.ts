import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Localizacion } from '../localizacion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrarIncendioDialogComponent } from './borrarIncendioDialog/borrarIncendioDialog.component';




@Component({
  selector: 'app-mapIncendios',
  templateUrl: './mapIncendios.component.html',
  styleUrls: ['./mapIncendios.component.css']
})
export class MapIncendiosComponent implements OnInit {
  mostrarTabla=false;
  code;
  incendios;
  displayedColumns: string[];
  dataSource;

  constructor(private servicio: MyServiceService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getIncendios();
    }
  getIncendios():void{
    this.servicio.getIncendios().subscribe(incendio => {
        this.mostrar(incendio);
        this.incendios=incendio;
    });
  }
  mostrar(incendio){
    this.displayedColumns = ['id', 'nombre', 'latitud', 'longitud', 'editar/borrar'];
    this.dataSource = incendio;
    this.mostrarTabla=true;
  }
  eliminarIncendio(incendio: Localizacion): void{
    this.incendios = this.incendios.filter(i => i!= incendio);
    this.servicio.eliminarIncendio(incendio).subscribe( res => {
    this.dataSource = this.dataSource.filter(i => i !== incendio);
    this.code = `   `;
    }
    );
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(BorrarIncendioDialogComponent, {
      width: '250px',
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
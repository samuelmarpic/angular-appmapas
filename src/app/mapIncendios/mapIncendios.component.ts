import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Localizacion } from '../localizacion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrarIncendioDialogComponent } from './borrarIncendioDialog/borrarIncendioDialog.component';
import { EditarIncendioDialogComponent } from './editarIncendioDialog/editarIncendioDialog.component';
import { CrearIncendioDialogComponent } from './crearIncendioDialog/crearIncendioDialog.component';

export interface DialogData {
  llama: string;
  objeto: Localizacion;
  borrar: boolean;
}
export interface DialogDataEdit {
  llama: string;
  objeto: Localizacion;
}
export interface DialogDataCreate {
  llamaCrear: string;
  nombre: string;
  latitud: string;
  longitud: string;
}


@Component({
  selector: 'app-mapIncendios',
  templateUrl: './mapIncendios.component.html',
  styleUrls: ['./mapIncendios.component.css']
})
export class MapIncendiosComponent implements OnInit {
  llama: string = "el incendio de";
  llamaCrear: string = "un incendio";
  nombre: string;
  latitud: string;
  longitud: string;
  mostrarTabla=false;
  borrar: boolean = false;
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
  guardarIncendio(incendio: Localizacion): void{
    this.servicio.guardarIncendio(incendio).subscribe();
  }
  openDialog(incendio: Localizacion): void{
    const dialogRef = this.dialog.open(BorrarIncendioDialogComponent, {
      width: '250px',
      data: {llama: this.llama, objeto: incendio, borrar: this.borrar }
      });
    dialogRef.afterClosed().subscribe(result => { 
      console.log(result);
      if(result){
        this.eliminarIncendio(incendio);
      }
    });
  }
  añadirIncendio(nombre:string, la: string, lo: string): void {
    var id = this.incendios[this.incendios.length-1].id+1;
    nombre = nombre.trim();
    la = la.trim();
    lo = lo.trim();
    var inc = new Localizacion(id,nombre,la,lo);
    this.servicio.añadirIncendio(inc).subscribe(loc => {
      this.incendios.push(loc);
      this.getIncendios()});
  }
  openDialogCrear(): void {
    const dialogRef = this.dialog.open(CrearIncendioDialogComponent, {
      width: '500px',
      data: {llamaCrear: this.llamaCrear, nombre: this.nombre, latitud: this.latitud, longitud: this.longitud }
      });
    dialogRef.afterClosed().subscribe(result => { 
      this.nombre=result.nombre,
      this.latitud=result.latitud,
      this.longitud=result.longitud,
      this.añadirIncendio(this.nombre, this.latitud, this.longitud);
    });
  } 
  openDialogEdit(incendio: Localizacion): void{
    const dialogRef = this.dialog.open(EditarIncendioDialogComponent, {
      width: '500px',
      data: {llama: this.llama, objeto: incendio }
      });
    dialogRef.afterClosed().subscribe(result => { this.guardarIncendio(incendio);
    });
  }
}
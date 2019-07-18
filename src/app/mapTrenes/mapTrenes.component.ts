import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Localizacion } from '../localizacion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrarIncendioDialogComponent } from '../mapIncendios/borrarIncendioDialog/borrarIncendioDialog.component';
import { EditarIncendioDialogComponent } from '../mapIncendios/editarIncendioDialog/editarIncendioDialog.component';
import { CrearIncendioDialogComponent } from '../mapIncendios/crearIncendioDialog/crearIncendioDialog.component';

@Component({
  selector: 'app-mapTrenes',
  templateUrl: './mapTrenes.component.html',
  styleUrls: ['./mapTrenes.component.css']
})
export class MapTrenesComponent implements OnInit {
  
  llama: string = "la estación";
  llamaCrear: string = "una estación";
  nombre: string;
  latitud: string;
  longitud: string;
  mostrarTabla=false;
  borrar: boolean = false;
  code;
  estaciones;
  displayedColumns: string[];
  dataSource;
  constructor(private servicio: MyServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getEstaciones();
  }
  getEstaciones():void{
    this.servicio.getEstaciones().subscribe(estacion => {
      this.mostrar(estacion);
      this.estaciones=estacion;
    });
  }
  mostrar(estacion){
    this.displayedColumns = ['id', 'nombre', 'latitud', 'longitud', 'editar/borrar'];
    this.dataSource = estacion;
    this.mostrarTabla=true;
  }
  eliminarEstacion(estacion: Localizacion): void{
    this.estaciones = this.estaciones.filter(i => i!= estacion);
    this.servicio.eliminarEstacion(estacion).subscribe( res => {
      this.dataSource = this.dataSource.filter(i => i !== estacion);
      this.code = `   `;
    }
    );
  }
  guardarEstacion(estacion: Localizacion): void{
    this.servicio.guardarEstacion(estacion).subscribe();
  }
  openDialog(estacion: Localizacion): void{
    const dialogRef = this.dialog.open(BorrarIncendioDialogComponent, {
      width: '250px',
      data: {llama: this.llama, objeto: estacion, borrar: this.borrar }
    });
    dialogRef.afterClosed().subscribe(result => { 
      console.log(result);
      if(result){
        this.eliminarEstacion(estacion);
      }
    });
  }
  añadirEstacion(nombre:string, la: string, lo: string): void {
    var id = this.estaciones[this.estaciones.length-1].id+1;
    nombre = nombre.trim();
    la = la.trim();
    lo = lo.trim();
    var est = new Localizacion(id,nombre,la,lo);
    this.servicio.añadirEstacion(est).subscribe(loc => {
      this.estaciones.push(loc);
      this.getEstaciones()});
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
      this.añadirEstacion(this.nombre, this.latitud, this.longitud);
    });
  } 
  openDialogEdit(estacion: Localizacion): void{
    const dialogRef = this.dialog.open(EditarIncendioDialogComponent, {
      width: '500px',
      data: {llama: this.llama, objeto: estacion }
    });
    dialogRef.afterClosed().subscribe(result => { this.guardarEstacion(estacion);});
  }
}
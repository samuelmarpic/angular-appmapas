import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Localizacion } from '../localizacion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrarIncendioDialogComponent } from '../mapIncendios/borrarIncendioDialog/borrarIncendioDialog.component';
import { EditarIncendioDialogComponent } from '../mapIncendios/editarIncendioDialog/editarIncendioDialog.component';
import { CrearIncendioDialogComponent } from '../mapIncendios/crearIncendioDialog/crearIncendioDialog.component';

@Component({
  selector: 'app-mapCapitales',
  templateUrl: './mapCapitales.component.html',
  styleUrls: ['./mapCapitales.component.css']
})
export class MapCapitalesComponent implements OnInit {
  llama: string = "la capital";
  llamaCrear: string = "una capital";
  nombre: string;
  latitud: string;
  longitud: string;
  mostrarTabla=false;
  borrar: boolean = false;
  code;
  capitales;
  displayedColumns: string[];
  dataSource;
  constructor(private servicio: MyServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getCapitales();
  }
  getCapitales():void{
    this.servicio.getCapitales().subscribe(capital => {
      this.mostrar(capital);
      this.capitales=capital;
    });
  }
  mostrar(capital){
    this.displayedColumns = ['id', 'nombre', 'latitud', 'longitud', 'editar/borrar'];
    this.dataSource = capital;
    this.mostrarTabla=true;
  }
  eliminarCapital(capital: Localizacion): void{
    this.capitales = this.capitales.filter(i => i!= capital);
    this.servicio.eliminarCapital(capital).subscribe( res => {
      this.dataSource = this.dataSource.filter(i => i !== capital);
      this.code = `   `;
    }
    );
  }
  guardarCapital(capital: Localizacion): void{
    this.servicio.guardarCapital(capital).subscribe();
  }
  openDialog(capital: Localizacion): void{
    const dialogRef = this.dialog.open(BorrarIncendioDialogComponent, {
      width: '250px',
      data: {llama: this.llama, objeto: capital, borrar: this.borrar }
    });
    dialogRef.afterClosed().subscribe(result => { 
      console.log(result);
      if(result){
        this.eliminarCapital(capital);
      }
    });
  }
  añadirCapital(nombre:string, la: string, lo: string): void {
    var id = this.capitales[this.capitales.length-1].id+1;
    nombre = nombre.trim();
    la = la.trim();
    lo = lo.trim();
    var est = new Localizacion(id,nombre,la,lo);
    this.servicio.añadirCapital(est).subscribe(loc => {
      this.capitales.push(loc);
      this.getCapitales()});
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
      this.añadirCapital(this.nombre, this.latitud, this.longitud);
    });
  } 
  openDialogEdit(capital: Localizacion): void{
    const dialogRef = this.dialog.open(EditarIncendioDialogComponent, {
      width: '500px',
      data: {llama: this.llama, objeto: capital }
    });
    dialogRef.afterClosed().subscribe(result => { this.guardarCapital(capital);});
  }
}
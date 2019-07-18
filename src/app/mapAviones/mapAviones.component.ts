import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Localizacion } from '../localizacion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrarIncendioDialogComponent } from '../mapIncendios/borrarIncendioDialog/borrarIncendioDialog.component';
import { EditarIncendioDialogComponent } from '../mapIncendios/editarIncendioDialog/editarIncendioDialog.component';
import { CrearIncendioDialogComponent } from '../mapIncendios/crearIncendioDialog/crearIncendioDialog.component';

declare let L;

@Component({
  selector: 'app-mapAviones',
  templateUrl: './mapAviones.component.html',
  styleUrls: ['./mapAviones.component.css']
})
export class MapAvionesComponent implements OnInit {
  llama: string = "el aeropuerto de";
  llamaCrear: string = "un aeropuerto";
  nombre: string;
  latitud: string;
  longitud: string;
  mostrarTabla=false;
  borrar: boolean = false;
  code;
  aeropuertos;
  displayedColumns: string[];
  dataSource;
  constructor(private servicio: MyServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAeropuertos();
  }
  getAeropuertos():void{
    this.servicio.getAeropuertos().subscribe(aeropuerto => {
      this.mostrar(aeropuerto);
      this.aeropuertos=aeropuerto;
    });
  }
  mostrar(aeropuerto){
    this.displayedColumns = ['id', 'nombre', 'latitud', 'longitud', 'editar/borrar'];
    this.dataSource = aeropuerto;
    this.mostrarTabla=true;
  }
  eliminarAeropuerto(aeropuerto: Localizacion): void{
    this.aeropuertos = this.aeropuertos.filter(i => i!= aeropuerto);
    this.servicio.eliminarAeropuerto(aeropuerto).subscribe( res => {
      this.dataSource = this.dataSource.filter(i => i !== aeropuerto);
      this.code = `   `;
    }
    );
  }
  guardarAeropuerto(aeropuerto: Localizacion): void{
    this.servicio.guardarAeropuerto(aeropuerto).subscribe();
  }
  openDialog(aeropuerto: Localizacion): void{
    const dialogRef = this.dialog.open(BorrarIncendioDialogComponent, {
      width: '250px',
      data: {llama: this.llama, objeto: aeropuerto, borrar: this.borrar }
    });
    dialogRef.afterClosed().subscribe(result => { 
      console.log(result);
      if(result){
        this.eliminarAeropuerto(aeropuerto);
      }
    });
  }
  añadirAeropuerto(nombre:string, la: string, lo: string): void {
    var id = this.aeropuertos[this.aeropuertos.length-1].id+1;
    nombre = nombre.trim();
    la = la.trim();
    lo = lo.trim();
    var inc = new Localizacion(id,nombre,la,lo);
    this.servicio.añadirAeropuerto(inc).subscribe(loc => {
      this.aeropuertos.push(loc);
      this.getAeropuertos()});
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
      this.añadirAeropuerto(this.nombre, this.latitud, this.longitud);
    });
  } 
  openDialogEdit(aeropuerto: Localizacion): void{
    const dialogRef = this.dialog.open(EditarIncendioDialogComponent, {
      width: '500px',
      data: {llama: this.llama, objeto: aeropuerto }
    });
    dialogRef.afterClosed().subscribe(result => { this.guardarAeropuerto(aeropuerto);});
  }
}
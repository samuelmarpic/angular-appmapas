import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { MapaComponent } from '../mapa/mapa.component';
import { Localizacion } from '../localizacion';

@Component({
  selector: 'app-Principal',
  templateUrl: './Principal.component.html',
  styleUrls: ['./Principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public mapaNormal=false;
  public mapaTopo=false;
  constructor(private servicio: MyServiceService) { }
  m:MapaComponent;

  localizaciones: Localizacion[];
  ngOnInit() {
    this.getLocalizaciones();
  }
  getLocalizaciones():void{
    this.servicio.getLocalizaciones().subscribe(localizacion=>this.localizaciones=localizacion);
  }
  add(nombre:string, la: string, lo: string): void {
    var id = this.localizaciones[this.localizaciones.length-1].id;
    nombre = nombre.trim();
    la = la.trim();
    lo = lo.trim();
    var loc = new Localizacion(id,nombre,la,lo);
    this.servicio.addLocalizacion(loc).subscribe(loc => {this.localizaciones.push(loc);});
  }
  verMapaTopo(){
    this.mapaTopo=true;
    this.ngOnInit();
    this.mapaNormal=false;
  }
  verMapaNormal(){
    this.mapaNormal=true;
    this.ngOnInit();
    this.mapaTopo=false;
  }
}

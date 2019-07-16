import { Component, OnInit, ViewChild } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { MapaComponent } from '../mapa/mapa.component';
import { TabsComponent } from '../tabs/tabs.component';
import { Localizacion } from '../localizacion';

declare let L;
@Component({
  selector: 'app-Principal',
  templateUrl: './Principal.component.html',
  styleUrls: ['./Principal.component.css']
})
export class PrincipalComponent implements OnInit {

  @ViewChild(MapaComponent, {static: false}) m: MapaComponent;
  
  @ViewChild(TabsComponent, {static: false}) t: TabsComponent;

  ngAfterViewInit() {

  }

  constructor(private servicio: MyServiceService) { }

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
    this.m.verMapaTopo();
  }
  verMapaNormal(){
    this.m.verMapaNormal();
  }
  verMarcadoresIncendios(){
    this.m.verMarcadoresIncendios();
    this.t.dis="incendios";
  }
  verMarcadoresCapitales(){
    this.m.verMarcadoresCapitales();
    this.t.dis="capitales";
  }
  verMapaTrenes(){
    this.m.verMapaTrenes();
    this.t.dis="trenes";
  }
  verMapaAviones(){
    this.m.verMapaAviones();
    this.t.dis="aviones";
  }
  buscarCapi(cap:string){
    this.m.juegoCapi=cap;
    this.t.juegoCapi=null;
    this.m.buscarCapital();
  }
  dibujarVuelo(){
      for (var i = 0; i < this.t.aeropuertos.length; i++) {
        if(String(this.t.valorOrigen)==String(this.t.aeropuertos[i].nombre)){
          var aerOr: Localizacion = this.t.aeropuertos[i];
        }
        if(String(this.t.valorDestino)==String(this.t.aeropuertos[i].nombre)){
          var aerDes: Localizacion = this.t.aeropuertos[i];
        }
      }
      
      this.t.distanciapuntos= Number((L.latLng(aerOr.latitud, aerOr.longitud).distanceTo(L.latLng(aerDes.latitud, aerDes.longitud))/1000).toFixed(2));
      this.m.dibujarVuelo(aerOr,aerDes);
      this.t.valorOrigen=null;
      this.t.valorDestino=null;
  }
}

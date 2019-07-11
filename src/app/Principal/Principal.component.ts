import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Localizacion } from '../localizacion';

declare let L;

@Component({
  selector: 'app-Principal',
  templateUrl: './Principal.component.html',
  styleUrls: ['./Principal.component.css']
})
export class PrincipalComponent implements OnInit {
  map;
  constructor(private servicio: MyServiceService) { }

  localizacion: Localizacion[];

  ngOnInit() {
    this.mapInit();
    this.getLocalizaciones();
  }
  mapInit(){

    this.map = L.map('map').setView([40.9934, -2.8575], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  }
  getLocalizaciones():void{
    this.servicio.getLocalizaciones().subscribe(localizacion=>this.localizacion=localizacion);
  }
  add(nombre:string, la: string, lo: string): void {

    nombre = nombre.trim();
    la = la.trim();
    lo = lo.trim();
    var loc = new Localizacion(nombre,la,lo);
    this.servicio.addLocalizacion(loc).subscribe(loc => {this.localizacion.push(loc);});
  }
}

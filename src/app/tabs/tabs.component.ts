import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @Output() public normal = new EventEmitter<boolean>();
  @Output() public topo = new EventEmitter<boolean>();
  @Output() public incendios = new EventEmitter<boolean>();
  @Output() public capitales = new EventEmitter<boolean>();
  @Output() public trenes = new EventEmitter<boolean>();
  @Output() public aviones = new EventEmitter<boolean>();
  @Output() public buscarCapi = new EventEmitter<boolean>();
  @Output() public dibujarVuelo = new EventEmitter<boolean>();
  @Output() public dis: string;
  buscar=false;
  aeropuertos;
  juegoCapi;
  valorOrigen=null;
  valorDestino=null;
  distanciapuntos = 0;
  verV=false;
  constructor(private servicio: MyServiceService) { }
  ngOnInit() {
    this.getAeropuertos();
  }
  jugarCapi(){
    this.buscar=true;
  }
  pararJugar(){
    this.buscar=false;
  }
  verVuelo(){
    this.verV=true;
  }
  getAeropuertos(): void{
    this.servicio.getAeropuertos().subscribe(aeropuerto=>this.aeropuertos=aeropuerto);
  }
}

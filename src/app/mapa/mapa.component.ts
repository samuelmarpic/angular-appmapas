import { Component, OnInit, Input } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Location } from '@angular/common';
import { PrincipalComponent } from '../Principal/Principal.component';
import { tick } from '@angular/core/testing';
import { Localizacion } from '../localizacion';

declare let L;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  map;
  juegoCapi;
  incendios: Localizacion[];
  capitales: Localizacion[];
  localizaciones: Localizacion[];
  estaciones: Localizacion[];
  aeropuertos: Localizacion[];
  constructor(private servicio: MyServiceService) { }

  ngOnInit() {
    this.mapInit();
    this.getIncendios();
    this.getCapitales();
    this.getEstaciones();
    this.getAeropuertos();
  
  }
  mapInit(){
    this.map = L.map('map').setView([40.9934, -2.8575], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  this.grupoLayerMapas();
  }
  verMapaTopo(){
    if(this.map!=null){
      this.map.remove();
    }
    this.map = L.map('map').setView([40.9934, -2.8575], 6);
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  }
  verMapaNormal(){
    if(this.map!=null){
      this.map.remove();
    }
    this.map = L.map('map').setView([40.9934, -2.8575], 6);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  }
  verMarcadoresIncendios(){
    if(this.map!=null){
      this.map.remove();
    }
    this.mapInit();
    for (var i = 0; i < this.incendios.length; i++) {
      var marker = new L.marker([this.incendios[i].latitud, this.incendios[i].longitud])
        .bindPopup(this.incendios[i].nombre)
        .addTo(this.map);
      for (var j = 0; j<this.incendios.length; j++) {
        if(i!=j && (Number((L.latLng(this.incendios[i].latitud,this.incendios[i].longitud)
            .distanceTo(L.latLng(this.incendios[j].latitud,this.incendios[j].longitud))/1000).toFixed(2))<100)){
            this.dibujar(this.incendios[i].latitud,this.incendios[i].longitud);
        }
      }
    }
  }
  verMarcadoresCapitales(){
    if(this.map!=null){
      this.map.remove();
    }
    this.mapInit();
    this.map.setView([48.95,8.45], 4);
    for (var i = 0; i < this.capitales.length; i++) {
      var marker = new L.marker([this.capitales[i].latitud, this.capitales[i].longitud])
        .bindPopup(this.capitales[i].nombre)
        .addTo(this.map);
    }
  }
  verMapaTrenes(){
    if(this.map!=null){
      this.map.remove();
    }
    this.mapRail();
    for (var i = 0; i < this.estaciones.length; i++) {
      var marker = new L.marker([this.estaciones[i].latitud, this.estaciones[i].longitud])
        .bindPopup(this.estaciones[i].nombre)
        .addTo(this.map);
    }
  }
  mapRail(){
    this.map= L.map('map').setView([40.9934, -2.8575], 6);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }).addTo(this.map);
    }
  getLocalizaciones():void{
    this.servicio.getLocalizaciones().subscribe(localizacion=>this.localizaciones=localizacion);
  }
  getIncendios():void{
    this.servicio.getIncendios().subscribe(incendio=>this.incendios=incendio);
  }
  getCapitales(): void{
    this.servicio.getCapitales().subscribe(capital=>this.capitales=capital);
  }
  getEstaciones(): void{
    this.servicio.getEstaciones().subscribe(estacion=>this.estaciones=estacion);
  }
  getAeropuertos(): void{
    this.servicio.getAeropuertos().subscribe(aeropuerto=>this.aeropuertos=aeropuerto);
  }
  dibujar(a?:string, b?:string){
    var circle = L.circle([a, b], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100000
  }).addTo(this.map);
  }
  grupoLayerMapas(){

    var topographic = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {id: 'MapID', attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}),
    streets   = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {id: 'MapID', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
    roads = L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {id: 'MapID', attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
    night = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {id: 'MapaID', attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 8,
            format: 'jpg',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level'});
    var baseMaps = {
      "Topographic": topographic,
      "Streets": streets,
      "Roads": roads,
      "Night": night
    };
    
    L.control.layers(baseMaps).addTo(this.map);
  }
  buscarCapital(){
    var encontrado = false;
    for(var i = 0; i<this.capitales.length;i++){
      if(String(this.juegoCapi)==String(this.capitales[i].nombre)){
        this.dibujarCapi(String(this.capitales[i].latitud),String(this.capitales[i].longitud));
        encontrado = true;
      }
    }
    if(!encontrado){
      alert("Capital no encontrada");
    }
    
  }
  dibujarCapi(a?:string, b?:string){
    var circle = L.circle([a, b], {
      color: 'green',
      fillColor: '#36EC1B',
      fillOpacity: 0.5,
      radius: 100000
  }).addTo(this.map);
  }
  verMapaAviones(){
    if(this.map!=null){
      this.map.remove();
    }
    this.mapInit();
    this.map.setView([40.0, 20.0], 2);
    for (var i = 0; i < this.aeropuertos.length; i++) {
      var marker = new L.marker([this.aeropuertos[i].latitud, this.aeropuertos[i].longitud])
        .bindPopup(this.aeropuertos[i].nombre)
        .addTo(this.map);
    }
  }
}

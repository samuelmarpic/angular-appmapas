import { Component, OnInit } from '@angular/core';
import sampleData from '/home/marina/angular-appmapas/src/assets/ciudades.json';
import { Location } from '@angular/common';

declare let L;

@Component({
  selector: 'app-mapAviones',
  templateUrl: './mapAviones.component.html',
  styleUrls: ['./mapAviones.component.css']
})
export class MapAvionesComponent implements OnInit {
  slidervalue = 5;
  distanciapuntos = 0;
  anterior=null;
  verAeropuertos = false;
  public verUnAeropuerto;
  verVuelo = false;
  valorOrigen=null;
  valorDestino=null;
  Ciudades: any = sampleData;

  constructor(
    private location: Location
  ) { }
  mapa;
  ngOnInit() {
    this.mapInit();
    this.markersInit();
    this.grupoLayerMapas();
    
  }

  mapInit(){
    this.mapa= L.map('map').setView([40.0, 20.0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapa);
  }
  markersInit(){
    for (var i = 0; i < this.Ciudades.ciud.length; i++) {
      var marker = new L.marker([this.Ciudades.ciud[i][1],this.Ciudades.ciud[i][2]])
        .bindPopup(this.Ciudades.ciud[i][0])
        .addTo(this.mapa);
    }
  }
  slidezoom(){
    this.mapa.setZoom(this.slidervalue);
  }
  verAeropuertosBut(){
    this.verAeropuertos= true;
  }
  verVueloBut(){
    this.verVuelo=true;
  }
  verUnAeropuertoBut(a?){
    if (this.anterior != null){
    this.mapa.removeLayer(this.anterior);
    }
    this.mapa.setView([a[1],a[2]]);
    this.mapa.setZoom(5);
    this.dibujar(String(a[1]),String(a[2]));
  }
  dibujar(a?:string, b?:string){
    var circle = L.circle([a, b], {
      color: 'green',
      fillColor: '#36EC1B',
      fillOpacity: 0.5,
      radius: 100000
  }).addTo(this.mapa);
    this.anterior=circle;
  }
  goBack(): void{
    this.location.back();
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
    
    L.control.layers(baseMaps).addTo(this.mapa);
  }
  dibujarVuelo(){
    var aerOr = [];
    var aerDes = [];
    for (var i = 0; i < this.Ciudades.ciud.length; i++) {
      if(String(this.valorOrigen)==String(this.Ciudades.ciud[i][0])){
        aerOr=this.Ciudades.ciud[i];
      }
      if(String(this.valorDestino)==String(this.Ciudades.ciud[i][0])){
        aerDes=this.Ciudades.ciud[i];
      }
    }
    
    this.distanciapuntos= Number((L.latLng(aerOr[1],aerOr[2]).distanceTo(L.latLng(aerDes[1],aerDes[2]))/1000).toFixed(2));
    var polylinePoints = [
      [aerOr[1], aerOr[2]],
      [aerDes[1], aerDes[2]]
    ];
    if(aerOr[0]!=aerDes[0]){
    var polyline = L.polyline(polylinePoints, 
      { weight: 10,
      strock: true,
      color: 'red',
      }).addTo(this.mapa);
    
    this.mapa.setView([((aerOr[1]+aerDes[1])/2), ((aerOr[2]+aerDes[2])/2)]);
  }
  }
}
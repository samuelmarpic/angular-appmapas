import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Location } from '@angular/common'

declare let L;

@Component({
  selector: 'app-mapCapitales',
  templateUrl: './mapCapitales.component.html',
  styleUrls: ['./mapCapitales.component.css']
})
export class MapCapitalesComponent implements OnInit {

  mapa;
  markers;
  nombremarker;
  latmarker;
  lonmarker;
  juegoCapi = null;
  buscar = false;
  slidervalue = 5;
  distancialat = 0.25;
  distancialon = 0.25;
  constructor(private myServiceService: MyServiceService,
              private location: Location) { }

  ngOnInit() {
    this.mapInit();
    this.getCapitales();
    this.markersInit();
    this.grupoLayerMapas();
  }
  mapInit(){
    this.mapa = L.map('map').setView([48.95,8.45], 4);
    
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.mapa);
  }
  markersInit(){
    for (var i = 0; i < this.markers.length; i++) {
      var marker = new L.marker([this.markers[i][1],this.markers[i][2]])
        .bindPopup(this.markers[i][0])
        .addTo(this.mapa);
    }
  }
  crear(){
    var m = L.marker([this.latmarker,this.lonmarker],{draggable: true})
      .bindPopup(this.nombremarker)
      .addTo(this.mapa);
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

  slidezoom(){
    this.mapa.setZoom(this.slidervalue);
  }
  getCapitales(): void {
    this.markers=this.myServiceService.getCapitales();
  }
  buscarCapital(){
    var encontrado = false;
    var greenIcon = L.icon({
      iconUrl: 'leaf-green.png',
      shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    for(var i = 0; i<this.markers.length;i++){
      if(String(this.juegoCapi)==String(this.markers[i][0])){
        this.dibujar(String(this.markers[i][1]),String(this.markers[i][2]));
        encontrado = true;
      }
    }
    if(!encontrado){
      alert("Capital no encontrada");
    }
    
  }
  dibujar(a?:string, b?:string){
    var circle = L.circle([a, b], {
      color: 'green',
      fillColor: '#36EC1B',
      fillOpacity: 0.5,
      radius: 100000
  }).addTo(this.mapa);
  }
  quieresjugar(){
    this.buscar=true;
  }
  goBack(): void{
    this.location.back();
  }
  }
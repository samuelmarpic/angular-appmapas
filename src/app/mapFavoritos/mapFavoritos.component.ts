import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

declare let L;

@Component({
  selector: 'app-mapFavoritos',
  templateUrl: './mapFavoritos.component.html',
  styleUrls: ['./mapFavoritos.component.css']
})
export class MapFavoritosComponent implements OnInit {
  
  mapa;
  nombremarker;
  latmarker;
  lonmarker;
  slidervalue = 5;
  distancialat = 0.25;
  distancialon = 0.25;
  constructor(private location: Location) { }

  ngOnInit() {
    this.mapInit();
    this.markersInit();
    this.addMarker();
  }
  mapInit(){
    this.mapa = L.map('map').setView([40.9934, -2.8575], 6);
    
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.mapa);
  
  }
  markersInit(){

    var markers = [
      ["León", 42.5989995, -5.5682413],
      ["Zamora", 41.6857693, -5.9423150],
      ["Salamanca", 40.7665581, -6.0217649],
      ["Albacete", 38.9934, -1.8515],
      ["Madrid",40.437801, -3.695407]
    ];
    for (var i = 0; i < markers.length; i++) {
      var marker = new L.marker([markers[i][1],markers[i][2]])
        .bindPopup(markers[i][0])
        .addTo(this.mapa);
      //conjunto de condiciones para dibujar circulos
      for(var j=0; j < markers.length; j++) {
        if(i!=j && ((Math.abs(Number(markers[i][1])-Number(markers[j][1]))<this.distancialat) 
                      || Math.abs(Number(markers[i][2])-Number(markers[j][2]))<this.distancialon)){
          this.dibujar(String(markers[i][1]),String(markers[i][2]));
        }
      }
    }
  }

  addMarker(){
  }

  crear(){
    var m = L.marker([this.latmarker,this.lonmarker],{draggable: true})
      .bindPopup(this.nombremarker)
      .addTo(this.mapa);
  }

  slidezoom(){
    this.mapa.setZoom(this.slidervalue);
  }

  dibujar(a?:string, b?:string){
    var circle = L.circle([a, b], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100000
  }).addTo(this.mapa);
  }
  goBack(): void{
    this.location.back();
  }
  }
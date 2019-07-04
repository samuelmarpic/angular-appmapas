import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare let L;

@Component({
  selector: 'app-mapIncendios',
  templateUrl: './mapIncendios.component.html',
  styleUrls: ['./mapIncendios.component.css']
})
export class MapIncendiosComponent implements OnInit {
  mapa;
  nombremarker;
  latmarker;
  lonmarker;
  marcadores = [];
  slidervalue = 5;
  distancialat = 0.25;
  distancialon = 0.25;
  constructor(private location: Location) { }

  ngOnInit() {
    this.mapInit();
    this.markersInit();
    this.grupoLayerMapas();
  }
  mapInit(){
    this.mapa = L.map('map').setView([40.9934, -2.8575], 6);
    
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }).addTo(this.mapa);
  
  }
  markersInit(){

    this.marcadores = [
      ["León", 42.5989995, -5.5682413],
      ["Ourense", 42.351285, -7.856715],
      ["Zamora", 41.6857693, -5.9423150],
      ["Vigo", 42.199239, -8.647281],
      ["Salamanca", 40.7665581, -6.0217649],
      ["Albacete", 38.9934, -1.8515],
      ["Madrid",40.437801, -3.695407]
    ];
    for (var i = 0; i < this.marcadores.length; i++) {
      var marker = new L.marker([this.marcadores[i][1],this.marcadores[i][2]])
        .bindPopup(this.marcadores[i][0])
        .addTo(this.mapa);
      //conjunto de condiciones para dibujar circulos
      for(var j=0; j < this.marcadores.length; j++) {
        if(i!=j && (Math.sqrt(Math.pow((Number(this.marcadores[i][1])-Number(this.marcadores[j][1])),2)+
                              (Math.pow((Number(this.marcadores[i][2])-Number(this.marcadores[j][2])),2)))<0.90)){
                                this.dibujar(String(this.marcadores[i][1]),String(this.marcadores[i][2]));
                              }
      }
    }
  }

  grupoLayerMapas(){

    var topographic = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {id: 'MapID', attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}),
    streets   = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {id: 'MapID', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});


    var baseMaps = {
      "Topographic": topographic,
      "Streets": streets
    };
    
    L.control.layers(baseMaps).addTo(this.mapa);
  }

  crear(){
    var m = L.marker([this.latmarker,this.lonmarker],{draggable: true})
      .bindPopup(this.nombremarker)
      .addTo(this.mapa);
  for (var i = 0; i < this.marcadores.length; i++) {
      if((Math.sqrt(Math.pow((Number(this.marcadores[i][1])-Number(this.latmarker)),2)+
                            (Math.pow((Number(this.marcadores[i][2])-Number(this.lonmarker)),2)))<0.90)){
                              this.dibujar(String(this.latmarker),String(this.lonmarker));
                              this.dibujar(String(this.marcadores[i][1]),String(this.marcadores[i][2]));
                            }
  }
  this.marcadores.push((this.nombremarker),(this.latmarker),(this.lonmarker));
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
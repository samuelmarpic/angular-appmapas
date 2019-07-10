import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as $ from 'jquery';

declare let L;
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
var iconoMarcador=null;
var nombreMarcador;
var dibMarc = true;
var poligono = [];
var colorBorde=null;
var colorRelleno=null;
var verMarcadores=[];
@Component({
  selector: 'app-mapFavoritos',
  templateUrl: './mapFavoritos.component.html',
  styleUrls: ['./mapFavoritos.component.css']
})
export class MapFavoritosComponent implements OnInit {
  imgGreenIcon="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
  imgBlueIcon="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
  imgRedIcon="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
  imgGreenColIcon="https://i.imgur.com/XrKKnih.png";
  imgBlueColIcon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADGCAMAAAAqo6adAAAAA1BMVEUAAP79f+LBAAAASElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+BsYAAAF7hZJ0AAAAAElFTkSuQmCC";
  imgRedColIcon="https://i.ebayimg.com/images/i/281048636574-0-1/s-l1000.jpg";
  imgIcon=[];
  crosshairCursor = false;
  latmarker;
  lonmarker;
  slidervalue = 5;
  distancialat = 0.25;
  distancialon = 0.25;
  latitudClick = null;
  longitudClick = null;
  nombreMark: string;
  nombrePoly: string;
  verMarcadoresComp=[];
  verPolyComp=[];
  verBorde=[];
  verRelleno=[];
  verlatlngmarc=[];
  constructor(private location: Location) { }
  mapa=L.map;
  ngOnInit() {

// We’ll add a OSM tile layer to our map
  var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, {
          maxZoom: 18,
          attribution: osmAttrib
      });


  // initialize the map on the "map" div with a given center and zoom
  var map = L.map('map').setView([38.9934, -1.8615], 14).addLayer(osm);
  
  /*if (this.crosshairCursor == true){
    L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled');
    }*/
  $("#addMarkerButton").on("click",function(){
    L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled');
    dibMarc=true;
  });
  // attaching function on map click
  map.on('click', onMapClick);

  // Script for adding marker on map click


  function onMapClick(e) {

      var geojsonFeature = {
          "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [e.latlng.lat, e.latlng.lng]
          }
      }
      
      var marker;
    if (iconoMarcador!=null && dibMarc == true){
      L.geoJson(geojsonFeature, {
        
          pointToLayer: function(feature, latlng){
            
              marker = L.marker(e.latlng, {
                
                  title: "Resource Location",
                  alt: "Resource Location",
                  color: "#000",
                  riseOnHover: true,
                  draggable: true,
                  icon: iconoMarcador
              }).bindPopup("<b>"+nombreMarcador+"</b>"+"<br/><input type='button' value='Delete this marker' class='marker-delete-button'/>");

              marker.on("popupopen", onPopupOpen);
       
              return marker;
          }
      }).addTo(map);
      verMarcadores.push([Number(e.latlng.lat).toFixed(2)],[Number(e.latlng.lng).toFixed(2)]);
      poligono.push([e.latlng.lat,e.latlng.lng]);
      L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled');
      dibMarc = false;
    }
  }
this.verlatlngmarc=verMarcadores;

// Function to handle delete as well as other events on marker popup open
  function onPopupOpen() {

      var tempMarker = this;

      //var tempMarkerGeoJSON = this.toGeoJSON();

      //var lID = tempMarker._leaflet_id; // Getting Leaflet ID of this marker

      // To remove marker on click of delete
      $(".marker-delete-button:visible").click(function () {
          map.removeLayer(tempMarker);
      });
  }
      $("#addMarkerButton").on("click",function(){
    L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled');
    dibMarc=true;
  });
  $("#addPolygonButtonSelected").hide();
  $("#addPolygonButtonSelected").click(function(){
    var principio = poligono[0];
    poligono.push(principio);
    L.polygon(poligono, 
      { weight: 5,
      strock: true,
      color: colorBorde,
      fillColor: colorRelleno
      }).bindPopup("Hola").addTo(map);
      poligono=[];
      $("#addPolygonButton").show();
      $("#addPolygonButtonSelected").hide();
    });
  }

  goBack(): void{
    this.location.back();
  }
  selectGreen(): void{
    iconoMarcador=greenIcon;
    nombreMarcador=this.nombreMark;
    this.imgIcon.push([this.imgGreenIcon]);
    this.verMarcadoresComp.push([this.nombreMark]);
    this.nombreMark = null;
  }
  selectBlue(): void{
    iconoMarcador=blueIcon;
    nombreMarcador=this.nombreMark;
    this.imgIcon.push([this.imgBlueIcon]);
    this.verMarcadoresComp.push([this.nombreMark]);
    this.nombreMark = null;
  }
  selectRed(): void{
    iconoMarcador=redIcon;
    nombreMarcador=this.nombreMark;
    this.imgIcon.push([this.imgRedIcon]);
    this.verMarcadoresComp.push([this.nombreMark]);
    this.nombreMark = null;
}
  stopPropagation(event){
    event.stopPropagation();
  }
  selectBordeVerdeRellenoVerde(): void{
    colorBorde='green';
    colorRelleno='green';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgGreenColIcon]);
    this.verRelleno.push([this.imgGreenColIcon]);
    if(poligono.length>0){
    $("#addPolygonButton").hide();
    $("#addPolygonButtonSelected").show();
    }
}
  selectBordeVerdeRellenoAzul(): void{
    colorBorde='green';
    colorRelleno='blue';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgGreenColIcon]);
    this.verRelleno.push([this.imgBlueColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeVerdeRellenoRojo(): void{
    colorBorde='green';
    colorRelleno='red';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgGreenColIcon]);
    this.verRelleno.push([this.imgRedColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeAzulRellenoVerde(): void{
    colorBorde='blue';
    colorRelleno='green';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgBlueColIcon]);
    this.verRelleno.push([this.imgGreenColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeAzulRellenoAzul(): void{
    colorBorde='blue';
    colorRelleno='blue';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgBlueColIcon]);
    this.verRelleno.push([this.imgBlueColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeAzulRellenoRojo(): void{
    colorBorde='blue';
    colorRelleno='red';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgBlueColIcon]);
    this.verRelleno.push([this.imgRedColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeRojoRellenoVerde(): void{
    colorBorde='red';
    colorRelleno='green';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgRedColIcon]);
    this.verRelleno.push([this.imgGreenColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeRojoRellenoAzul(): void{
    colorBorde='red';
    colorRelleno='blue';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgRedColIcon]);
    this.verRelleno.push([this.imgBlueColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeRojoRellenoRojo(): void{
    colorBorde='red';
    colorRelleno='red';
    this.verPolyComp.push([this.nombrePoly]);
    this.verBorde.push([this.imgRedColIcon]);
    this.verRelleno.push([this.imgRedColIcon]);
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
}
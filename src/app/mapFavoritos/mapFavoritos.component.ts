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
      verMarcadores.push([nombreMarcador]);
      poligono.push([e.latlng.lat,e.latlng.lng]);
      L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled');
      dibMarc = false;
    }
  }


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
    if(poligono.length>0){
    $("#addPolygonButton").hide();
    $("#addPolygonButtonSelected").show();
    }
}
  selectBordeVerdeRellenoAzul(): void{
    colorBorde='green';
    colorRelleno='blue';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeVerdeRellenoRojo(): void{
    colorBorde='green';
    colorRelleno='red';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeAzulRellenoVerde(): void{
    colorBorde='blue';
    colorRelleno='green';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeAzulRellenoAzul(): void{
    colorBorde='blue';
    colorRelleno='blue';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeAzulRellenoRojo(): void{
    colorBorde='blue';
    colorRelleno='red';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeRojoRellenoVerde(): void{
    colorBorde='red';
    colorRelleno='green';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeRojoRellenoAzul(): void{
    colorBorde='red';
    colorRelleno='blue';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
  selectBordeRojoRellenoRojo(): void{
    colorBorde='red';
    colorRelleno='red';
    if(poligono.length>0){
      $("#addPolygonButton").hide();
      $("#addPolygonButtonSelected").show();
    }
  }
}
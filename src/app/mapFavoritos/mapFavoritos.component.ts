import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as $ from 'jquery';

declare let L;

@Component({
  selector: 'app-mapFavoritos',
  templateUrl: './mapFavoritos.component.html',
  styleUrls: ['./mapFavoritos.component.css']
})
export class MapFavoritosComponent implements OnInit {
  

  nombremarker;
  latmarker;
  lonmarker;
  slidervalue = 5;
  distancialat = 0.25;
  distancialon = 0.25;
  latitudClick = null;
  longitudClick = null;
  nombreMark: string;
  constructor(private location: Location) { }
  mapa=L.map;
  ngOnInit() {

    var customIcon = new L.Icon({
      iconUrl: 'https://image.flaticon.com/icons/svg/854/854866.svg',
      iconSize: [50, 50],
      iconAnchor: [25, 50]
    });
// We’ll add a OSM tile layer to our map
  var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, {
          maxZoom: 18,
          attribution: osmAttrib
      });


  // initialize the map on the "map" div with a given center and zoom
  var map = L.map('map').setView([38.9934, -1.8615], 14).addLayer(osm);

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

      L.geoJson(geojsonFeature, {
        
          pointToLayer: function(feature, latlng){
            
              marker = L.marker(e.latlng, {
                
                  title: "Resource Location",
                  alt: "Resource Location",
                  color: "#000",
                  riseOnHover: true,
                  draggable: true,

              }).bindPopup("<input value='nombreMark' class='marker-delete'/><br><input type='button' value='Delete this marker' class='marker-delete-button'/>");

              marker.on("popupopen", onPopupOpen);
       
              return marker;
          }
      }).addTo(map);
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


  // getting all the markers at once
  function getAllMarkers() {
    
      var allMarkersObjArray = [];//new Array();
      var allMarkersGeoJsonArray = [];//new Array();

      $.each(map._layers, function (ml) {
          //console.log(map._layers)
          if (map._layers[ml].feature) {
            
              allMarkersObjArray.push(this)
                                      allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
          }
      })

      console.log(allMarkersObjArray);
      alert("total Markers : " + allMarkersGeoJsonArray.length + "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array" );
  }
    $(".get-markers").on("click", getAllMarkers);
    function slidezoom(){
        map.setZoom(this.slidervalue);
    }
  }

  goBack(): void{
    this.location.back();
  }

  }
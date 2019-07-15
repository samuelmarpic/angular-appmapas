import { Component, OnInit ,} from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Location } from '@angular/common';
/*import { EstacionesMarkers } from '../estacionesMarkers';*/
declare let L;

@Component({
  selector: 'app-mapTrenes',
  templateUrl: './mapTrenes.component.html',
  styleUrls: ['./mapTrenes.component.css']
})
export class MapTrenesComponent implements OnInit {
  
  /*estaciones: EstacionesMarkers[];*/
  nuevoMarcador;

  constructor(private estacionService: MyServiceService,
              private location: Location) { }
  mapa;
  ngOnInit() {
    this.mapRail();
  }
  mapInit(){
    this.mapa= L.map('map').setView([40.9934, -2.8575], 6);
    /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapa);
    */
    L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
  }
  mapRail(){
  this.mapa= L.map('map').setView([40.9934, -2.8575], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapa);
    L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.mapa);
  }
}

import { Component, OnInit, Input } from '@angular/core';

declare let L;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Input() mapaNormal: boolean;
  @Input() mapaTopo: boolean;
  map;

  constructor() { }

  ngOnInit() {
    if(this.mapaNormal==true){
      this.mapNormal();
    }
    if(this.mapaTopo==true){
      this.mapTopo();
    }
  }
  mapNormal(){

    this.map = L.map('map').setView([40.9934, -2.8575], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  }
  mapTopo(){
    this.map = L.map('map').setView([40.9934, -2.8575], 6);
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  }

}

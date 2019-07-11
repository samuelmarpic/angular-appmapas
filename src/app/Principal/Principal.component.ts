import { Component, OnInit } from '@angular/core';

declare let L;

@Component({
  selector: 'app-Principal',
  templateUrl: './Principal.component.html',
  styleUrls: ['./Principal.component.css']
})
export class PrincipalComponent implements OnInit {
  map;
  constructor() { }

  ngOnInit() {
    this.mapInit();
  }
  mapInit(){

    this.map = L.map('map').setView([40.9934, -2.8575], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  }
}

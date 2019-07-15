import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @Output() public normal = new EventEmitter<boolean>();
  @Output() public topo = new EventEmitter<boolean>();
  @Output() public incendios = new EventEmitter<boolean>();
  @Output() public capitales = new EventEmitter<boolean>();
  @Output() public trenes = new EventEmitter<boolean>();
  @Output() public aviones = new EventEmitter<boolean>();
  @Output() public buscarCapi = new EventEmitter<boolean>();
  @Output() public dis: string;
  buscar=false;
  juegoCapi;
  constructor() { }
  ngOnInit() {
  }
  jugarCapi(){
    this.buscar=true;
  }
}

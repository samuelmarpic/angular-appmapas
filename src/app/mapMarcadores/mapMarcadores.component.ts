import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { MapAvionesComponent } from '../mapAviones/mapAviones.component';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-mapMarcadores',
  templateUrl: './mapMarcadores.component.html',
  styleUrls: ['./mapMarcadores.component.css']
})
export class MapMarcadoresComponent implements OnInit {


  constructor(private servicio: MyServiceService) { }
  ngOnInit() {
    }
  }

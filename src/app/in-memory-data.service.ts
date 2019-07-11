import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const estacionesTren = [
      { nombre: "Amberes-Central", latitud: 51.217222, longitud: 4.421454},
      { nombre: "St. Pancras", latitud:  51.531424, longitud: -0.126144},
      { nombre: "Grand Central", latitud: 40.752737, longitud: -73.977211},
      { nombre: "Gare du Nord", latitud: 48.880949, longitud: 2.355314},
      { nombre: "Milano Centrale", latitud: 45.487015, longitud: 9.205480},
      { nombre: "Kuala Lumpur", latitud: 3.139744, longitud: 101.693727},
      { nombre: "São Bento", latitud:41.145666, longitud: -8.610528},
      { nombre: "Madrid Atocha", latitud: 40.406761, longitud: -3.691099},
      { nombre: "Sirkeci Station", latitud: 41.015015, longitud: 28.976447},
      { nombre: "Chhatrapati Shivaji", latitud: 18.939846, longitud: 72.835444},
      { nombre: "CMF RAILWAY ", latitud: 18.969671, longitud: 72.819389},
      { nombre: "Union Station", latitud: 38.897896, longitud: -77.005745},
      { nombre: "Amsterdam Central", latitud: 52.379135, longitud: 4.900315},
      { nombre: "Gare de Lyon", latitud: 48.844435, longitud: 2.374383},
      { nombre: "Haydarpasa Terminal", latitud: 40.996889, longitud: 29.019294},
      { nombre: "Estação da Luz", latitud: -23.535030, longitud: -46.635309},
      { nombre: "Kazansky", latitud: 55.773627, longitud: 37.656748}
    ];
    return {estacionesTren};
  }
}

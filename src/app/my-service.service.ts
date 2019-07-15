import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localizacion } from './localizacion';
/*import { EstacionesMarkers } from './estacionesMarkers';*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  url = 'http://localhost:3000';
  private estacionesUrl = 'api/estaciones';

  

constructor(private http: HttpClient) { }
  capitales = [
    ["Madrid",40.437801, -3.695407],
    ["Lisboa",38.71,-9.15],
    ["Andorra",42.51,1.518],
    ["Praga",50.08,14.42],
    ["Roma",41.90,12.45],
    ["París",48.8,2.4],
    ["Londres",51.5,-1.1],
    ["Budapest",47.5,19.05],
    ["Monaco",43.74,7.38],
    ["Viena",48.20,16.36],
    ["Oslo",59.9,10.79],
    ["Amsterdam",52.37 ,4.909],
    ["Berna",46.95,7.45],
    ["Helsinki",60.17,24.94],
    ["Sofía",42.69,23.33],
    ["Bruselas",50.85,4.36],
    ["Zagreb",45.81,15.98],
    ["Dublín",53.35,-6.26],
    ["Copenhague",55.67,12.57],
    ["Berlín",52.52,13.407],
    ["Bratislava",48.15,17.1058],
    ["Tallin",59.43,24.75],
    ["Estocolmo",59.33,18.07]
  ];
  /*getCapitales() {
    return this.capitales;
  }*/

  getLocalizaciones(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/localizaciones');
  }
  getIncendios(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/incendios');
  }
  getCapitales(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/capitales');
  }
  getEstaciones(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/estaciones');
  }
  getAeropuertos(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/aeropuertos');
  }
  addLocalizacion(loc: Localizacion):Observable<Localizacion>{
    console.log(loc.nombre);
    return this.http.post<Localizacion>(this.url+'/localizaciones/',JSON.stringify(loc),httpOptions);
  }
}

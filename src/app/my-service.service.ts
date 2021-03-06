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
  eliminarIncendio(incendio: Localizacion | number): Observable<Localizacion> {
    const id = typeof incendio === 'number' ? incendio : incendio.id;
    const urli = `${this.url+'/incendios'}/${id}`;
  
    return this.http.delete<Localizacion>(urli, httpOptions);
  }
  guardarIncendio(incendio: Localizacion |number): Observable<any> {
    const id = typeof incendio === 'number' ? incendio : incendio.id;
    return this.http.put(`${this.url+'/incendios'}/${id}`, JSON.stringify(incendio), httpOptions);
  }
  añadirIncendio(inc: Localizacion):Observable<Localizacion>{
    console.log(inc.nombre);
    return this.http.post<Localizacion>(this.url+'/incendios/',JSON.stringify(inc),httpOptions);
  }
  getCapitales(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/capitales');
  }
  eliminarCapital(capital: Localizacion | number): Observable<Localizacion> {
    const id = typeof capital === 'number' ? capital : capital.id;
    const urli = `${this.url+'/capitales'}/${id}`;
  
    return this.http.delete<Localizacion>(urli, httpOptions);
  }
  guardarCapital(capital: Localizacion |number): Observable<any> {
    const id = typeof capital === 'number' ? capital : capital.id;
    return this.http.put(`${this.url+'/capitales'}/${id}`, JSON.stringify(capital), httpOptions);
  }
  añadirCapital(cap: Localizacion):Observable<Localizacion>{
    console.log(cap.nombre);
    return this.http.post<Localizacion>(this.url+'/capitales/',JSON.stringify(cap),httpOptions);
  }
  getEstaciones(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/estaciones');
  }
  eliminarEstacion(estacion: Localizacion | number): Observable<Localizacion> {
    const id = typeof estacion === 'number' ? estacion : estacion.id;
    const urli = `${this.url+'/estaciones'}/${id}`;
  
    return this.http.delete<Localizacion>(urli, httpOptions);
  }
  guardarEstacion(estacion: Localizacion |number): Observable<any> {
    const id = typeof estacion === 'number' ? estacion : estacion.id;
    return this.http.put(`${this.url+'/estaciones'}/${id}`, JSON.stringify(estacion), httpOptions);
  }
  añadirEstacion(est: Localizacion):Observable<Localizacion>{
    console.log(est.nombre);
    return this.http.post<Localizacion>(this.url+'/estaciones/',JSON.stringify(est),httpOptions);
  }
  getAeropuertos(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.url+'/aeropuertos');
  }
  eliminarAeropuerto(aeropuerto: Localizacion | number): Observable<Localizacion> {
    const id = typeof aeropuerto === 'number' ? aeropuerto : aeropuerto.id;
    const urli = `${this.url+'/aeropuertos'}/${id}`;
  
    return this.http.delete<Localizacion>(urli, httpOptions);
  }
  guardarAeropuerto(aeropuerto: Localizacion |number): Observable<any> {
    const id = typeof aeropuerto === 'number' ? aeropuerto : aeropuerto.id;
    return this.http.put(`${this.url+'/aeropuertos'}/${id}`, JSON.stringify(aeropuerto), httpOptions);
  }
  añadirAeropuerto(aer: Localizacion):Observable<Localizacion>{
    console.log(aer.nombre);
    return this.http.post<Localizacion>(this.url+'/aeropuertos/',JSON.stringify(aer),httpOptions);
  }
  addLocalizacion(loc: Localizacion):Observable<Localizacion>{
    console.log(loc.nombre);
    return this.http.post<Localizacion>(this.url+'/localizaciones/',JSON.stringify(loc),httpOptions);
  }
}

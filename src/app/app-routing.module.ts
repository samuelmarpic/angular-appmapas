import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MapMarcadoresComponent } from './mapMarcadores/mapMarcadores.component';
import { MapTrenesComponent } from './mapTrenes/mapTrenes.component';
import { MapIncendiosComponent } from './mapIncendios/mapIncendios.component';
import { MapAvionesComponent } from './mapAviones/mapAviones.component';
import { MapCapitalesComponent } from './mapCapitales/mapCapitales.component';
import { MapFavoritosComponent } from './mapFavoritos/mapFavoritos.component';
import { PrincipalComponent } from './Principal/Principal.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Principal', pathMatch: 'full' },
  { path: 'mapMarcadores', component: MapMarcadoresComponent},
  { path: 'mapTrenes', component: MapTrenesComponent},
  { path: 'mapAviones', component: MapAvionesComponent},
  { path: 'mapIncendios', component: MapIncendiosComponent},
  { path: 'mapFavoritos', component: MapFavoritosComponent},
  { path: 'mapCapitales', component: MapCapitalesComponent},
  { path: 'Principal', component: PrincipalComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

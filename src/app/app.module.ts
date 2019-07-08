import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MapMarcadoresComponent } from './mapMarcadores/mapMarcadores.component';
import { MapTrenesComponent } from './mapTrenes/mapTrenes.component';
import { MapIncendiosComponent } from './mapIncendios/mapIncendios.component';
import { MapAvionesComponent } from './mapAviones/mapAviones.component';
import { MapCapitalesComponent } from './mapCapitales/mapCapitales.component';
import { MapFavoritosComponent } from './mapFavoritos/mapFavoritos.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSliderModule, MatCheckboxModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';


const appRoutes: Routes = [
   { path: 'mapMarcadores', component: MapMarcadoresComponent},
   { path: 'mapTrenes', component: MapTrenesComponent},
   { path: 'mapAviones', component: MapAvionesComponent},
   { path: 'mapIncendios', component: MapIncendiosComponent},
   { path: 'mapFavoritos', component: MapFavoritosComponent},
   { path: 'mapCapitales', component: MapCapitalesComponent}
];
@NgModule({
   declarations: [
      AppComponent,
      MapMarcadoresComponent,
      MapTrenesComponent,
      MapAvionesComponent,
      MapIncendiosComponent,
      MapCapitalesComponent,
      MapFavoritosComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(
         appRoutes,
         { enableTracing: true }
      ),
      HttpClientModule,
      BrowserAnimationsModule,
      MatSliderModule,
      ReactiveFormsModule,
      FormsModule,
      MatCheckboxModule,
      MatCardModule,
      MatFormFieldModule,
      MatRadioModule,
      MatButtonModule,
      MatSelectModule,
      MatTabsModule,
      MatDividerModule,
      MatListModule,
      MatMenuModule,
      MatIconModule
   ],
   providers: [],
   bootstrap: [
   AppComponent
   ]
})
export class AppModule { }

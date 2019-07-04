/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapMarcadoresComponent } from './mapMarcadores.component';

describe('MapMarcadoresComponent', () => {
  let component: MapMarcadoresComponent;
  let fixture: ComponentFixture<MapMarcadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMarcadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMarcadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

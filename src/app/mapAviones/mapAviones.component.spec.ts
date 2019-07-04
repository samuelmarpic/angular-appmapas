/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapAvionesComponent } from './mapAviones.component';

describe('MapAvionesComponent', () => {
  let component: MapAvionesComponent;
  let fixture: ComponentFixture<MapAvionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAvionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAvionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

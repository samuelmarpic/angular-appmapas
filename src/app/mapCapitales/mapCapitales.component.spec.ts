/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapCapitalesComponent } from './mapCapitales.component';

describe('MapCapitalesComponent', () => {
  let component: MapCapitalesComponent;
  let fixture: ComponentFixture<MapCapitalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCapitalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCapitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

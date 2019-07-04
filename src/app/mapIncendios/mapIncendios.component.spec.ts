/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapIncendiosComponent } from './mapIncendios.component';

describe('MapIncendiosComponent', () => {
  let component: MapIncendiosComponent;
  let fixture: ComponentFixture<MapIncendiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIncendiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIncendiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

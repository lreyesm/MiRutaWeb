import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMapBoxComponent } from './mapa-map-box.component';

describe('MapaMapBoxComponent', () => {
  let component: MapaMapBoxComponent;
  let fixture: ComponentFixture<MapaMapBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMapBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMapBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

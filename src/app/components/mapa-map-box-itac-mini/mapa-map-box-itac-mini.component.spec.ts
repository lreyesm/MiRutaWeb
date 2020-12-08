import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMapBoxItacMiniComponent } from './mapa-map-box-itac-mini.component';

describe('MapaMapBoxItacMiniComponent', () => {
  let component: MapaMapBoxItacMiniComponent;
  let fixture: ComponentFixture<MapaMapBoxItacMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMapBoxItacMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMapBoxItacMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

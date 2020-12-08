import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMapBoxItacComponent } from './mapa-map-box-itac.component';

describe('MapaMapBoxItacComponent', () => {
  let component: MapaMapBoxItacComponent;
  let fixture: ComponentFixture<MapaMapBoxItacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMapBoxItacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMapBoxItacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

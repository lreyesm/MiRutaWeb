import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMapBoxTareaMiniComponent } from './mapa-map-box-tarea-mini.component';

describe('MapaMapBoxTareaMiniComponent', () => {
  let component: MapaMapBoxTareaMiniComponent;
  let fixture: ComponentFixture<MapaMapBoxTareaMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMapBoxTareaMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMapBoxTareaMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

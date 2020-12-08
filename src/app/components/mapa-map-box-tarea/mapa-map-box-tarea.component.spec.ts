import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMapBoxTareaComponent } from './mapa-map-box-tarea.component';

describe('MapaMapBoxTareaComponent', () => {
  let component: MapaMapBoxTareaComponent;
  let fixture: ComponentFixture<MapaMapBoxTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMapBoxTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMapBoxTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

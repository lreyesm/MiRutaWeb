import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasSearchComponent } from './tareas-search.component';

describe('TareasSearchComponent', () => {
  let component: TareasSearchComponent;
  let fixture: ComponentFixture<TareasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

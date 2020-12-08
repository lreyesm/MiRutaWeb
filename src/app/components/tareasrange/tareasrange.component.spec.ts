import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasrangeComponent } from './tareasrange.component';

describe('TareasrangeComponent', () => {
  let component: TareasrangeComponent;
  let fixture: ComponentFixture<TareasrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasrangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

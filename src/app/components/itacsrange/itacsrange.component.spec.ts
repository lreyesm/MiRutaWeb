import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItacsrangeComponent } from './itacsrange.component';

describe('ItacsrangeComponent', () => {
  let component: ItacsrangeComponent;
  let fixture: ComponentFixture<ItacsrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItacsrangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItacsrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItacComponent } from './itac.component';

describe('ItacComponent', () => {
  let component: ItacComponent;
  let fixture: ComponentFixture<ItacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItacsComponent } from './itacs.component';

describe('ItacsComponent', () => {
  let component: ItacsComponent;
  let fixture: ComponentFixture<ItacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItacsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

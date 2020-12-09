import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItacsSearchComponent } from './itacs-search.component';

describe('ItacsSearchComponent', () => {
  let component: ItacsSearchComponent;
  let fixture: ComponentFixture<ItacsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItacsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItacsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

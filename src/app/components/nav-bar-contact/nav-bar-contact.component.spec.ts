import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarContactComponent } from './nav-bar-contact.component';

describe('NavBarContactComponent', () => {
  let component: NavBarContactComponent;
  let fixture: ComponentFixture<NavBarContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

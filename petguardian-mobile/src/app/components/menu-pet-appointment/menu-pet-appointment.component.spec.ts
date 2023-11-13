import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPetAppointmentComponent } from './menu-pet-appointment.component';

describe('MenuPetAppointmentComponent', () => {
  let component: MenuPetAppointmentComponent;
  let fixture: ComponentFixture<MenuPetAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPetAppointmentComponent]
    });
    fixture = TestBed.createComponent(MenuPetAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

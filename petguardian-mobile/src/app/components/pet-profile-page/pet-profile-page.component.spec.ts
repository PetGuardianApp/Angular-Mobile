import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetProfilePageComponent } from './pet-profile-page.component';

describe('PetProfilePageComponent', () => {
  let component: PetProfilePageComponent;
  let fixture: ComponentFixture<PetProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetProfilePageComponent]
    });
    fixture = TestBed.createComponent(PetProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

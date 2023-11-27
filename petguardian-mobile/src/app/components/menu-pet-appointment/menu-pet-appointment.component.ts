import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-pet-appointment',
  templateUrl: './menu-pet-appointment.component.html',
  styleUrls: ['./menu-pet-appointment.component.css']
})
export class MenuPetAppointmentComponent {

  constructor(private router: Router){

  }

  redirectPetsPage() {
    this.router.navigate(['petsList']);
  }
  redirectVisitPage() {
    this.router.navigate(['appointments']);
  }
}

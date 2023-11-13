import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { HomeComponent } from './components/home/home.component';
import { PetProfilePageComponent } from './components/pet-profile-page/pet-profile-page.component';
import { MenuPetAppointmentComponent } from './components/menu-pet-appointment/menu-pet-appointment.component';
const routes: Routes = [{path: '', component: LoginComponent},

  {path: 'map', component: MapPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'pet-profile', component: PetProfilePageComponent},
  {path: 'menu-pet-appointment', component: MenuPetAppointmentComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

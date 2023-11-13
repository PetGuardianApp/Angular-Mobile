import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { LoginComponent } from './components/login/login.component';
import { MapPageComponent } from './components/map-page/map-page.component';

const routes: Routes = [
  {path: 'petsList', component: PetsListComponent},
{path: '', component: LoginComponent},

  {path: 'map', component: MapPageComponent},

  {path: 'petsList', component: PetsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

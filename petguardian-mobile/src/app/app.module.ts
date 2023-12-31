import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../enviroments/enviroments';
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SidenavLinkComponent } from './components/sidenav-link/sidenav-link.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GoogleMapsModule } from '@angular/google-maps';
import { PetProfilePageComponent } from './components/pet-profile-page/pet-profile-page.component';
import { MenuPetAppointmentComponent } from './components/menu-pet-appointment/menu-pet-appointment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { QrComponent } from './components/qr/qr.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PetsListComponent,
    SideNavComponent,
    SidenavLinkComponent,
    MapPageComponent,
    TopBarComponent,
    RegisterComponent,
    AppointmentsComponent,
    PetProfilePageComponent,
    MenuPetAppointmentComponent,
    ChatComponent,
    QrComponent,
    UserProfileComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    GoogleMapsModule,
    NgbModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    TranslocoRootModule
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

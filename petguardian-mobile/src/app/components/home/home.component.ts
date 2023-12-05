import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { ClientModel } from 'src/app/models/client.model';
import { PetModel } from 'src/app/models/pet.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { TranslocoService } from '@ngneat/transloco';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contentIsLoading: boolean = true;
  
  constructor(private router: Router, private apiService: ApiService,
    private storageService: StorageService, private translocoService:TranslocoService) {
    this.showData();
    this.client = new ClientModel;
    this.petsArray = [];
    this.clientAppointments = [];
    this.ifvisit = false;
    this.isTodayVisits = [];
    this.VisitPet = new PetModel;
  }
  currentDate: Date = new Date();
  public client: ClientModel;
  public petsArray: PetModel[];
  public clientAppointments: AppointmentModel[];
  public ifvisit: Boolean;
  public isTodayVisits: string[];
  public VisitPet: PetModel;

  ngOnInit() {
  }

  formatStartDate(inputDate: string): string {
    // Use a regular expression to capture the date components
    const dateRegex: RegExp = /(\d{2})(\d{2})(\d{4})_(\d{2}):(\d{2})/;
    // Match the regular expression and capture groups
    const match: RegExpMatchArray | null = inputDate.match(dateRegex);

    if (match) {
      // Extract the captured groups for hour, min
      const hour: string = match[4];
      const min: string = match[5];

      // Format the date as "ddmmyyyy"
      const formattedStartDate: string = `${hour}:${min}`;
      return formattedStartDate;
    } else {
      return '';
    }
  }

  formatDate(inputDate: string): string {
    // Use a regular expression to capture the date components
    const dateRegex: RegExp = /(\d{2})(\d{2})(\d{4})_(\d{2}):(\d{2})/;
    // Match the regular expression and capture groups
    const match: RegExpMatchArray | null = inputDate.match(dateRegex);

    if (match) {
      // Extract the captured groups for day, month, and year
      const day: string = match[1];
      const month: string = match[2];
      const year: string = match[3];

      // Format the date as "ddmmyyyy"
      const formattedDate: string = `${day}${month}${year}`;
      return formattedDate;
    } else {
      return '';
    }
  }

  isTodayVisit(visit_date: string): Boolean {
    const day = this.currentDate.getDate().toString().padStart(2, '0'); // Ensure a leading zero if needed
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = this.currentDate.getFullYear().toString();
    const formattedDate = `${day}${month}${year}`;
    if (this.formatDate(visit_date) == formattedDate) {
      return true;
    } else {
      return false;
    }
  }
  redirectPetPage(id: string) {
    this.router.navigate(['pet-profile'], {
      queryParams: { petId: id }
    });
  }
  redirectVisitPage(id: string) {
    this.router.navigate(['appointment'], {
      queryParams: { appointmentId: id }
    });
  }

  showData() {
    
    this.apiService.getSingleClient(this.storageService.SessionGetStorage("uid")).then((client) => {
      this.client = client;
      console.log(client)
    });
    //VPUnbME8Kt27zmF7q7ne
    this.apiService.getClientPets(this.storageService.SessionGetStorage("uid")).then((petsArray) => {
      this.petsArray = petsArray;
      for (let i = 0; i < petsArray.length; i++) {
        if (petsArray[i].profile_image == "") {
          petsArray[i].profile_image = '/assets/img/logo_default.svg';
        }
      }
      this.contentIsLoading = false;
      console.log(petsArray)
    });

    this.apiService.getClientAppointments(this.storageService.SessionGetStorage("uid")).then((clientAppointments) => {
      this.clientAppointments = clientAppointments;
      let today_visit: Boolean = false;
      for (const element of this.clientAppointments) {
        this.apiService.getPet(element.pet_id || '').then((pet) => {
          this.VisitPet = pet;
          if (this.VisitPet.profile_image == '') {
            this.VisitPet.profile_image = '/assets/img/logo_default.svg';
          }
        })
        if (today_visit = this.isTodayVisit(element.end_date || '')) {
          this.isTodayVisits.push(element.end_date || '');
        }
      }
    })
  }

}

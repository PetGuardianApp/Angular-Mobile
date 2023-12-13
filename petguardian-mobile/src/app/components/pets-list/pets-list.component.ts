import { Component, OnInit } from '@angular/core';
import { PetModel } from 'src/app/models/pet.model';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent {
  registerPetForm: FormGroup;
  savedPets: any[] = [];
  base64Output: string = '';
  selectedFileName: string = '...';

  constructor(public apiService: ApiService, private router: Router, private datePipe: DatePipe,
    private fb: FormBuilder, private storageService: StorageService) {
    this.registerPetForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', Validators.required],
      breed: ['', [Validators.required]],
      birth: ['', Validators.required],
    })
    this.showData();
  }

  openForm(): void {
    const formElement = document.getElementById("myForm");
    if (formElement) {
      formElement.style.display = "block";
    }
  }

  closeForm(): void {
    const formElement = document.getElementById("myForm");
    if (formElement) {
      formElement.style.display = "none";
    }
  }

  redirectPetPage(id: string) {
    this.router.navigate(['pet-profile'], {
      queryParams: { petId: id }
    });
  }

  registerPet(): void {
    // Code for registering a new pet (same as before)
    var pet: PetModel = {
      client_id: this.storageService.SessionGetStorage("uid"),
      name: this.registerPetForm.value.name,
      type: this.registerPetForm.value.type,
      breed: this.registerPetForm.value.breed,
      birth: this.registerPetForm.value.birth
    };
    if (this.base64Output != ''){
      pet.profile_image = this.base64Output;
    }

    this.apiService.postClientPets(pet);
    // Close the form
    this.closeForm();
  }

  showData(): void {
    this.apiService.getClientPets(this.storageService.SessionGetStorage("uid")).then((petsArray) => {
      this.apiService.petsArray = petsArray;
      for (const pet of this.apiService.petsArray) {
        if (pet.profile_image == '') {
          pet.profile_image = '/assets/img/logo_default.svg';
        }
      }
      console.log(petsArray);
    })
  }

  onDateInput(event: MatDatepickerInputEvent<Date>): void {
    // Customize the date format as per your requirement
    this.registerPetForm.value.birth = this.datePipe.transform(event.value, 'ddMMyyyy') + '_00:00';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64Output = reader.result as string;
    };
    if (file){
      reader.readAsDataURL(file);
      this.selectedFileName = file.name;
    } else {
      this.selectedFileName = '...';
    }
  }
}

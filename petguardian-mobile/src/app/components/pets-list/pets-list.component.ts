import { Component, OnInit } from '@angular/core';
import { PetModel } from 'src/app/models/pet.model';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent {
  petModel: PetModel;
  savedPets: any[] = [];
  constructor(public apiService: ApiService, private router: Router, ) { 
    this.petModel = new PetModel;
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
    this.petModel.client_id = "VPUnbME8Kt27zmF7q7ne"
    this.apiService.postClientPets(this.petModel);
    // Close the form
    this.closeForm();
  }

  showData(): void {
    this.apiService.getClientPets("VPUnbME8Kt27zmF7q7ne").then((petsArray) => {
      this.apiService.petsArray = petsArray;
      for (const pet of this.apiService.petsArray) {
        if (pet.profile_image == '') {
          pet.profile_image = '/assets/img/dogImage1.jpg';
        } else{
          pet.profile_image = '/assets/img/dogImage2.jpg';
        }
      }
      console.log(petsArray);
    })
  }
}

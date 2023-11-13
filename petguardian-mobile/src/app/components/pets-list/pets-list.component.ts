import { Component, OnInit } from '@angular/core';
import { PetModel } from 'src/app/models/pet.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent {
  petModel: PetModel;
  savedPets: any[] = [];
  constructor(public apiService: ApiService) { 
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

  registerPet(): void {
    // Code for registering a new pet (same as before)

    // Update the savedPets array with an instance of PetModel
    // this.petsArray.push(this.petModel);
    // const requestBody: PetModel = {
    //   birth: '',
    //   breed: '',
    //   weight: {},
    //   health_info: {
    //     cardiac_freq: {},
    //     vaccines: [],
    //     observations: '',
    //     steps: {}
    //   },
    //   height: 0,
    //   name: '', // Use provided name or empty string if not provided
    //   type: '', // Use provided type or empty string if not provided
    //   vet_id: '',
    //   client_id: '',
    //   profile_image: '',
    //   id: '',
    //   ...this.petModel // Spread provided pet object to override default values if they are provided
    // };    
    // // const requestBody: PetModel = { ...this.petModel }; // Use object spread to create a shallow copy of the pet object    
    // console.log(requestBody);
    // // Store the updated pet data in session storage
    // sessionStorage.setItem('pets', JSON.stringify(this.petsArray));
    this.petModel.client_id = "VPUnbME8Kt27zmF7q7ne"
    this.apiService.postClientPets(this.petModel);
    location.reload

    // Close the form
    this.closeForm();
  }

  showData(): void {
    this.apiService.getClientPets("VPUnbME8Kt27zmF7q7ne").then((petsArray) => {
      this.apiService.petsArray = petsArray;
      console.log(petsArray);
    })
  }
}

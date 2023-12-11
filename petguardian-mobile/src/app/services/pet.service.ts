import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PetModel } from '../models/pet.model';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'https://petguardian-api.uc.r.appspot.com/'
  public petsArray: PetModel[] = [];
  public pet_list: PetModel[] = [];
  constructor(private apiService: ApiService, private storageService: StorageService, private http: HttpClient, private toastr: ToastrService) {
    apiService.getAllPets().then(data => {
      this.pet_list = data;
      storageService.SessionAddStorage("pets", this.pet_list)
    })
  }

  getClientPets(clientId: string): Promise<PetModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get<PetModel[]>(this.apiUrl + '/client/findPets/' + clientId)
        .subscribe(
          (response: PetModel[]) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  postClientPets(pet: PetModel): Promise<any> {
    const requestBody: PetModel = {
      birth: '',
      breed: '',
      weight: {},
      health_info: {
        cardiac_freq: {},
        vaccines: [],
        observations: '',
        steps: {}
      },
      height: 0,
      name: '', // Use provided name or empty string if not provided
      type: '', // Use provided type or empty string if not provided
      vet_id: '',
      client_id: '',
      profile_image: '',
      id: '',
      ...pet // Spread provided pet object to override default values if they are provided
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'pet/create', requestBody, { responseType: 'text' })
        .subscribe({
          next: data => {
            pet.profile_image = '/assets/img/logo_default.svg';
            this.petsArray.push(pet);
            this.toastr.success("Register completed", "Congratulations!");
          },
          error: error => {
            console.error('There was an error!', error);
            this.toastr.error("Error registering pet", "Error");
          }
        });
    });
  }

  getPet(petId: string): Promise<PetModel> {
    return new Promise((resolve, reject) => {
      this.http.get<PetModel>(this.apiUrl + '/pet/find/' + petId)
        .subscribe(
          (response: PetModel) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  updatePetHealthInfo(pet: any, pet_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + 'pet/add/' + pet_id + '/health_info', pet, { responseType: 'text' })
        .subscribe({
          next: data => {
            this.toastr.success("Update completed", "Congratulations!");
            resolve(data)
          },
          error: error => {
            this.toastr.error("Error updating health info", "Error");
            reject(error)
          }
        });
    });
  }

  updatePet(pet: PetModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch(this.apiUrl + 'pet/update/' + pet.id, pet, { responseType: 'text' })
        .subscribe({
          next: data => {
            this.toastr.success("Update completed", "Congratulations!");
            resolve(data)
          },
          error: error => {
            this.toastr.error("Error updating pet", "Error");
            reject(error)
          }
        });
    });
  }

  deletePet(pet_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiUrl + 'pet/' + pet_id)
        .subscribe({
          next: data => {
            this.toastr.success("Delete completed", "Congratulations!");
            resolve(data)
          },
          error: error => {
            this.toastr.error("Error deleting pet", "Error");
            reject(error)
          }
        });
    });
  }

}

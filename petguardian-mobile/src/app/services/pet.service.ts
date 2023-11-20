import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PetModel } from '../models/pet.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  public pet_list: PetModel[] = [];
  constructor(private apiService:ApiService, private storageService:StorageService) {
    apiService.getAllPets().then(data => {
      this.pet_list = data;
      storageService.SessionAddStorage("pets",this.pet_list)
    })
   }

   
  
}

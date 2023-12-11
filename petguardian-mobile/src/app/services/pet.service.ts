import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PetModel } from '../models/pet.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  public pet_list: PetModel[] = [];
  constructor(private apiService: ApiService, private storageService: StorageService) {
    this.fetchPets();
  }
  
  private async fetchPets() {
    try {
      const data = await this.apiService.getClientPets(this.storageService.SessionGetStorage("uid"));
      this.pet_list = data;
      this.storageService.SessionAddStorage("pets", this.pet_list);
    } catch (error) {
      // Handle errors if any
      console.error("Error fetching pets:", error);
    }
  }
  
  public async findPet(petId: string) {
    if (!this.pet_list) {
      // If pet_list is not yet populated, wait for it to be fetched
      await this.fetchPets();
    }
    return this.pet_list.find((pet) => pet.id === petId);
  }

   
  
}

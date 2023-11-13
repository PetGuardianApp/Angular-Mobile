import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { AppointmentModel } from '../models/appointment.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { PetModel } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://petguardian-api.uc.r.appspot.com/'
  private temp!: Observable<ClientModel[]>;
  public petsArray: PetModel[] = [];
  constructor(private http: HttpClient, private storageService: StorageService) {

  }

  getAppointments(uid: string): Promise<AppointmentModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get<AppointmentModel[]>(this.apiUrl + 'vet/findAppointments/' + uid)
        .subscribe(
          (response: AppointmentModel[]) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getClients(uid: string): Promise<ClientModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ClientModel[]>(this.apiUrl + 'vet/findClients/' + uid)
        .subscribe(
          (response: ClientModel[]) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getSingleClient(uid: string): Promise<ClientModel> {
    return new Promise((resolve, reject) => {
      this.http.get<ClientModel>(this.apiUrl + '/client/find/' + uid)
        .subscribe(
          (response: ClientModel) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
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
    console.log(requestBody);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'pet/create', requestBody, {responseType: 'text'})
        .subscribe({
          next: data => {
            this.petsArray.push(pet);
          },
          error: error => {
            console.error('There was an error!', error);
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

  getAllPets(): Promise<PetModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get<PetModel[]>(this.apiUrl + '/pet/all')
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

}

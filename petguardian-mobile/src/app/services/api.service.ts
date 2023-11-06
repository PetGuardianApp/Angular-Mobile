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

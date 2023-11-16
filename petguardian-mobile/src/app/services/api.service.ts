import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { AppointmentModel } from '../models/appointment.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { PetModel } from '../models/pet.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://petguardian-api.uc.r.appspot.com/'
  private temp!: Observable<ClientModel[]>;
  public petsArray: PetModel[] = [];

  constructor(private http: HttpClient, private storageService: StorageService, public afAuth: AngularFireAuth, private toastr:ToastrService) {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAppointments(uid: string): Promise<AppointmentModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get<AppointmentModel[]>(this.apiUrl + 'client/findAppointments/' + uid)
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
  getClientAppointments(uid: string): Promise<AppointmentModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get<AppointmentModel[]>(this.apiUrl + 'client/findAppointments/' + uid)
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
            pet.profile_image = '/assets/img/logo_default.svg';
            this.petsArray.push(pet);
            this.toastr.success("Register completed","Congratulations!");
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

  
addUser(client: ClientModel): Promise<any> {

  const headers = { 'content-type': 'application/json'}
  
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl + 'client/create/'+client.id, JSON.stringify(client), {'headers':headers})
      .subscribe({
        next: data => {
          
        },
        error: error => {
          console.log('Result', error);
        }


      });
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

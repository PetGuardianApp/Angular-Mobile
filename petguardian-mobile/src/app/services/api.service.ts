import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { AppointmentModel } from '../models/appointment.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { PetModel } from '../models/pet.model';
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
  currentDate: Date = new Date();

  constructor(private http: HttpClient, private storageService: StorageService, public afAuth: AngularFireAuth, private toastr: ToastrService) {
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


  addUser(client: ClientModel): Promise<any> {

    const headers = {
      'content-type': 'application/json',
      'responseType': 'json'
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'client/create/' + client.id, client, { headers: headers })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            if (error.status == 200) {
              resolve(client)
            }
            reject(error);
          }
        );
    });
  }

  googleReg(uid: string, mail: string, phone: string, displayName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getSingleClient(uid).then(response => {
        if (response == null) {
          var dbuser: ClientModel = {
            id: uid,
            name: displayName,
            address: { latitude: "0.0", longitude: "0.0" },
            email: mail,
            phone: Number(phone),
            surnames: ""
          }
          this.addUser(dbuser).then(result => {
            console.log()
            this.storageService.SessionAddStorage("uid", uid);
            resolve(dbuser); // Resolve the outer promise with the result
          }).catch(error => {

          });
        }

      }).catch(error => {
        reject(error); // Reject the outer promise if there's an error in getSingleClient
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

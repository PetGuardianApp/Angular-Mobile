import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private localUrl = 'http://localhost:8080/'
  private apiUrl = 'https://petguardian-api.uc.r.appspot.com/'
  private pollInterval = 5000; // 5 seconds
  private poller: any;

  // Subject to notify when a new message is received
  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Start polling for messages
  startPolling(uid: string) {
    this.poller = setInterval(() => this.pollForMessages(uid), this.pollInterval);
  }

  // Stop polling for messages
  stopPolling() {
    clearInterval(this.poller);
  }

  // Poll for new messages from the API
  private pollForMessages(uid: string) {
    console.log('Getting messages');
  
    this.http.get(this.apiUrl + "client/get/" + uid + "/message", { responseType: 'text' })
      .subscribe((response: string) => {
        console.log(response);
  
        if (response && response != "") {
          this.messageSubject.next(response);
          this.removeMessage(uid); // Optionally, remove the message from the database
        }
      });
  }

  public sendMessage(uid:string, message:string) {
    const headers = {
      'content-type': 'application/json',
      'responseType': 'json'
    };

    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + 'client/add/' + uid + "/message", message, { headers: headers })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });

  }

  // Remove a message from the database
  private removeMessage(uid:string) {
    const headers = {
      'content-type': 'application/json',
      'responseType': 'json'
    };

    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + 'client/update/' + uid + "/message", { headers: headers })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });

  }
}

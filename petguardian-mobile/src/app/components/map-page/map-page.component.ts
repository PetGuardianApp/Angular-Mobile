import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {
  public clientsArray: ClientModel[];

  constructor(private router: Router, private apiService: ApiService,
    private storageService: StorageService) {
    this.showData();
    this.clientsArray = [];
  }

  showData() {
    this.apiService.getClients("ceUaKPLjJmPq15Zu7qAlsFGjVzi2").then((clientsArray) => {
      this.clientsArray = clientsArray;
      console.log(clientsArray);
    });
  }

}

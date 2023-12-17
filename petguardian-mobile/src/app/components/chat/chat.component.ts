import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  vets: any[] = [];
  constructor(public apiService: ApiService, private storageService: StorageService, private router: Router) {
    this.showData();
  }

  redirectPetPage(id: string) {
    this.router.navigate(['chat-page'], {
      queryParams: { vetId: id }
    });
  }

  showData(): void {
    this.apiService.getClientVets(this.storageService.SessionGetStorage("uid")).then((vetsArray) => {
      this.vets = vetsArray;
      console.log(this.vets);
    })
  }
}

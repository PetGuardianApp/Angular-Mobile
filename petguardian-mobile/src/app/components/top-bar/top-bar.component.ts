import { Component, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from 'src/app/services/api.service';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  subscription: Subscription;
  prevScrollPos = window.pageYOffset;
  showPopup = false;
  showNotis = false;
  notifications: string[] = [];

  constructor(private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService,
    private translocoService: TranslocoService, private api: ApiService) {
    this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if (data == true) {
          const uid = storageService.SessionGetStorage('uid');
          if (uid) {
            api.getSingleClient(uid).then((data) => {
              if (data.notifications != undefined) {
                this.notifications = data.notifications;
              }

              if (this.notifications.length != 0) {
                // Change notis icon
                const notisIcon = document.getElementById("notiIcon") as HTMLImageElement;
                notisIcon.src = "/assets/menuIcons/notiOn.svg";
              } else {
                this.notifications.push("Any notifications found");
              }
            });
          }
        }
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.storageService.isLoggedNext(false);
      localStorage.clear();
      this.router.navigate(['/']);
      this.togglePopup();
    })
  }

  redirectProfile() {
    this.router.navigate(['profile']);
    this.togglePopup();
    this.changeMenuIcons();
  }

  changeMenuIcons() {
    // Enable profile icon
    const profile = document.getElementById("profileIcon") as HTMLImageElement;
    profile.src = "/assets/menuIcons/userOn.svg";

    // Disable all icons
    const pets = document.getElementById("petsIcon") as HTMLImageElement;
    const hopme = document.getElementById("dashboardIcon") as HTMLImageElement;
    const map = document.getElementById("mapIcon") as HTMLImageElement;
    const chat = document.getElementById("chatIcon") as HTMLImageElement;
    const qr = document.getElementById("qrIcon") as HTMLImageElement;

    pets.src = "/assets/menuIcons/dogOff.svg";
    hopme.src = "/assets/menuIcons/homeOff.svg";
    map.src = "/assets/menuIcons/mapOff.svg";
    chat.src = "/assets/menuIcons/chatOff.svg";
    qr.src = "/assets/menuIcons/qrOff.svg";

  }

  removeNotification(noti: string) {
    const index = this.notifications.indexOf(noti);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }

    let u = new ClientModel();
    u.notifications = this.notifications;
    u.id = this.storageService.SessionGetStorage('uid');

    // Manage notifications    
    if (this.notifications.length == 0) {
      u.notifications = ["any"];
      this.notifications.push("Any notifications found");
      const notisIcon = document.getElementById("notiIcon") as HTMLImageElement;
      notisIcon.src = "/assets/menuIcons/notiOff.svg";
    }

    // Make patch
    this.api.editUser(u).then(() => {
    });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  toggleNotisPopup() {
    this.showNotis = !this.showNotis;
  }  
}

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
/*
import { StorageService } from '../services/storage.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
*/

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  changeIcon(iconToAct: string) {
    switch (iconToAct) {
      case "dashboardIcon":
        // Enable menu
        const iconElement = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement.src = "/assets/menuIcons/homeOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("qrIcon", "qr");
        break;
      case "petsIcon":
        // Enable menu
        const iconElement1 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement1.src = "/assets/menuIcons/dogOn.svg";

        // Disable others
        this.disableIcon("dashboardIcon", "home");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("qrIcon", "qr");
        break;
      case "mapIcon":
        // Enable menu
        const iconElement2 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement2.src = "/assets/menuIcons/mapOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("dashboardIcon", "home");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("qrIcon", "qr");
        break;
      case "chatIcon":
        // Enable menu
        const iconElement3 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement3.src = "/assets/menuIcons/chatOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("dashboardIcon", "home");
        this.disableIcon("qrIcon", "qr");
        break;
      case "qrIcon":
        // Enable menu
        const iconElement4 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement4.src = "/assets/menuIcons/qrOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("dashboardIcon", "home");
        break;
    }
  }

  disableIcon(imageId: string, iconName: string) {
    const iconElement = document.getElementById(imageId) as HTMLImageElement;
    iconElement.src = "/assets/menuIcons/" + iconName + "Off.svg";
  }
  
  subscription: Subscription;
  isLoggedIn$: Observable<boolean>;
  
  constructor(private afAuth: AngularFireAuth, private router: Router, 
    private storageService: StorageService) {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
    this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if (data == false) {
          this.router.navigate(['/']);
        }
      });
  }

  
}

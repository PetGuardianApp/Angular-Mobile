import { Component, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  prevScrollPos = window.pageYOffset;
  showPopup = false;

  constructor(private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService,
    private translocoService: TranslocoService) {
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

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  public swapLang(lang: string) {
    this.translocoService.setActiveLang(lang);

    const catIcon = document.getElementById("catIcon") as HTMLImageElement;
    const esIcon = document.getElementById("esIcon") as HTMLImageElement;
    const enIcon = document.getElementById("enIcon") as HTMLImageElement;

    switch (lang) {
      case 'cat':
        catIcon.width = 30;
        esIcon.width = 18;
        enIcon.width = 18;
        break;
      case 'es':
        catIcon.width = 18;
        esIcon.width = 30;
        enIcon.width = 18;
        break;
      case 'en':
        catIcon.width = 18;
        esIcon.width = 18;
        enIcon.width = 30;
        break;
    }
  }

 /* @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollPos > currentScrollPos) {
      document.getElementById('barra')!.style.top = '0';
    } else {
      document.getElementById('barra')!.style.top = '-60px';
      this.showPopup = false; // Oculta el popup al hacer scroll hacia abajo
    }

    this.prevScrollPos = currentScrollPos;
  }*/
}

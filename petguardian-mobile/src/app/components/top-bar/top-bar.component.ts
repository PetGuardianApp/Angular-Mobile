import { Component, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  prevScrollPos = window.pageYOffset;
  showPopup = false;

  subscription: Subscription;
  isLoggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService) {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
    this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if (data == false) {
          this.router.navigate(['/']);
        }
      });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollPos > currentScrollPos) {
      document.getElementById('barra')!.style.top = '0';
    } else {
      document.getElementById('barra')!.style.top = '-60px';
      this.showPopup = false; // Oculta el popup al hacer scroll hacia abajo
    }

    this.prevScrollPos = currentScrollPos;
  }
}

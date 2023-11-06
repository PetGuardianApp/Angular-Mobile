import { Component } from '@angular/core';
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
  /*
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

  logout() {
    this.afAuth.signOut().then(() => {
      this.storageService.isLoggedNext(false);
      this.router.navigate(['/'])
    })
  }
  */
}

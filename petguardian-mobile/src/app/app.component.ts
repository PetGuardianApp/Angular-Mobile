import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petguardian-mobile';

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

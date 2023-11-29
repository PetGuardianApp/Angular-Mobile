import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from '../../services/storage.service';
import { Subscription, async, asyncScheduler, from } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginUser: FormGroup;
  subscription: Subscription;


  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, public router: Router,
    private fireBaseErrorService: FirebaseErrorService, private toastr: ToastrService, private storageService: StorageService,
    public apiService: ApiService) {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if (data == true) {
          this.router.navigate(['home']);
        }
      });

    this.checkSession();
  }

  checkSession() {
    const email = localStorage.getItem('usrMail') || '';
    const pswd = localStorage.getItem('usrPswd') || '';

    this.login(email, pswd, true);
  }

  login(localEmail: string, localPassword: string, fromCookies: boolean) {
    var email = this.loginUser.value.email;
    var password = this.loginUser.value.password;

    if (fromCookies) {
      if (localEmail == "" || localPassword == "") {
        return;
      } else {
        email = localEmail;
        password = localPassword;
      }
    }



    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => { //Realitza login
      localStorage.setItem('usrPswd',password);
      localStorage.setItem('usrMail',email);
      this.storageService.isLoggedNext(true);
      this.storageService.SessionAddStorage("uid", user.user?.uid);
      this.router.navigate(['home']);
    }).catch((error) => {

      this.toastr.error(this.fireBaseErrorService.firebaseError(error.code), 'Error');
    })

  }

  public GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        
        this.apiService.googleReg(result.user?.uid!,result.user?.email!,result.user?.phoneNumber!,result.user?.displayName!).then(result => {
        
          this.storageService.SessionAddStorage("uid", result);
          this.storageService.isLoggedNext(true);
          this.router.navigate(['home']);
          
          
        })
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}

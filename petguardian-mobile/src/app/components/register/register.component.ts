import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerUser: FormGroup;
  subscription: Subscription;

  


  constructor(private fb:FormBuilder, private afAuth: AngularFireAuth, private router: Router,
     private fireBaseErrorService: FirebaseErrorService, private toastr:ToastrService,private storageService:StorageService,
     private apiService:ApiService){
      this.registerUser = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',Validators.required],
        password_rep: ['',[Validators.required]],
        name: ['',Validators.required],
        surnames: ['',[Validators.required]],
        phone: [' ',[Validators.required,Validators.min(100000000),Validators.max(999999999)]],
        address: ['',Validators.required],
      })


      this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if(data==true){
          
          this.router.navigate(['dashboard']);
          
        }
      });

      

      
  }

  

  register(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    if(this.registerUser.value.password_rep != this.registerUser.value.password ){
      this.toastr.error("Passwords do not match","Password error")
    }



    this.afAuth.createUserWithEmailAndPassword(email,password).then((user) => { //Realitza Registre
      
      
      var dbuser : ClientModel = {
        id:user.user?.uid,
        name:this.registerUser.value.name,
        address: {latitude:"0.0",longitude:"0.0"},
        email: this.registerUser.value.email,
        phone:this.registerUser.value.phone,
        surnames:this.registerUser.value.surnames
      }
      this.apiService.addUser(dbuser);
      this.toastr.success("Register completed","Congratulations!")
      this.router.navigate(['']);
      
      
    }).catch((error) => {
      
      this.toastr.error(this.fireBaseErrorService.firebaseError(error.code),'Error');
    })
    
  }
}

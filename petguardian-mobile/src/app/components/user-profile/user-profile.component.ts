import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/models/client.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  public client: ClientModel = new ClientModel;
  public registerUser: FormGroup;

  constructor(private apiService:ApiService, private storageService:StorageService,private fb:FormBuilder){
    
    this.apiService.getSingleClient(this.storageService.SessionGetStorage("uid")).then((result) => {
      this.client = result;
      this.registerUser.controls['email'].setValue(result.email);
      this.registerUser.controls['name'].setValue(result.name);
      this.registerUser.controls['surnames'].setValue(result.surnames);
      this.registerUser.controls['phone'].setValue(result.phone);

      
      
    });

    this.registerUser = this.fb.group({
      email: [{value: '',disabled: true},[Validators.required, Validators.email]],
      name: [{value: '',disabled: true},Validators.required],
      surnames: [{value: '',disabled: true},[Validators.required]],
      phone: [{value: '',disabled: true},[Validators.required,Validators.min(100000000),Validators.max(999999999)]],
    })
  }

  public edit(){
    this.client.name = this.registerUser.get('name')!.value
    this.client.email = this.registerUser.get('email')!.value
    this.client.surnames = this.registerUser.get('surnames')!.value
    this.client.phone = this.registerUser.get('phone')!.value
    this.apiService.editUser(this.client)
  }

  public enable(field:string){
    
    this.registerUser.controls[field].enable();
   
  }


}

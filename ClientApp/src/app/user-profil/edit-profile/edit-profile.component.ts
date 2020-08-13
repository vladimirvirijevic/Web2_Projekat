import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthUser } from 'src/app/models/authUser';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
   editForm:FormGroup;
   
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public authenticationService: AuthenticationService
  ) {
      this.editForm=this.formBuilder.group({
        'textEditForFirstName': [this.authenticationService.currentUserValue.firstName, Validators.required],
        'textEditForSecondName': [ this.authenticationService.currentUserValue.lastName, Validators.required],
        'textForCity':[ this.authenticationService.currentUserValue.city,Validators.required],
        'textForPhone':[ this.authenticationService.currentUserValue.phone, Validators.required]});
   }

  ngOnInit(): void {

  }
 
  get firstName() { return this.editForm.get('textEditForFirstName'); }
  get lastName() { return this.editForm.get('textEditForSecondName'); }
  get city() { return this.editForm.get('textForCity'); }
  get phone() { return this.editForm.get('textForPhone'); }

  onEdit()
  {
    const userInfo={
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      city: this.city.value,
      phone: this.phone.value
    }

    this.userService.editUser(userInfo)
    .subscribe(
      data => {
        console.log(data);
      
      },
      error => {
        if (error.status == 400) {
         
          console.log('ok');
        }
        else {
          console.log('error');
        }
      }
    );




  }
}

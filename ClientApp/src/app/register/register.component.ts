import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  showErrorMessage = false;
  showConfirmation = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', Validators.required]
    } , {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get lastName() { return this.registerForm.get('lastName'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get city() { return this.registerForm.get('city'); }
  get phone() { return this.registerForm.get('phone'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get email() { return this.registerForm.get('email'); }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerInfo = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      city: this.city.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
    }

    this.userService.register(registerInfo)
      .subscribe(
        data => {
          this.showConfirmation = true;
          //this.clearFields();
        },
        error => {
          if (error.status == 409) {
              this.showErrorMessage = true;
          }
        }
      )
  }

  clearFields() {
    this.registerForm.get('lastName').setValue('');
    this.registerForm.get('firstName').setValue('');
    this.registerForm.get('email').setValue('');
    this.registerForm.get('password').setValue('');
    this.registerForm.get('confirmPassword').setValue('');
    this.registerForm.get('city').setValue('');
    this.registerForm.get('phone').setValue('');
  }

}

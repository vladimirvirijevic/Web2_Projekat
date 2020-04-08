import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get username() { return this.registerForm.get('username'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email'); }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerInfo = {
      username: this.username.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
    }

    alert(JSON.stringify(registerInfo));
  }

}

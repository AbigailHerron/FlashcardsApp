import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    //login: Login[] = [];
    // message: string = '';
    // err: string = '';

    submitted = false;
    authError = false;
    authErrorMsg!: string;

  loginForm = new FormGroup({
    email: new FormControl([''], Validators.required),
    password: new FormControl([''], Validators.required),
  });

  constructor(private service: BackendService, private router: Router) {}

  ngOnInit() {}
  
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value)
      .subscribe(() => {
          // Successful login
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Failed login
          this.authError = true;
          (this.authErrorMsg = error.error.msg)
        });
  }
}

//https://angular.io/guide/reactive-forms
//https://angular.io/guide/reactive-forms#basic-form-validation

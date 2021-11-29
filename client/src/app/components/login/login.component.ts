import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Login } from 'src/app/interfaces/login';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login: Login[] = [];
  message: string = '';
  err: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    /*
    this.loginService.getUsers().subscribe({
      next: (value: Login[]) => (this.login = value),
      complete: () => console.log(this.login),
      error: (mess) => (this.message = mess),
    });
    */
  }
  onSubmit(): void {
    this.http
      .post('http://localhost:3000/user/login', this.loginForm.value)
      .subscribe(
<<<<<<< HEAD
        (response) => console.log(response),
=======
        (response) => localStorage.setItem('userDetails', JSON.stringify(response)),
>>>>>>> 1db17065440c546be5e7ad4baa443c35595cb546
        (error) => (this.err = error.error.msg)
      );
  }
}

//https://angular.io/guide/reactive-forms
//https://angular.io/guide/reactive-forms#basic-form-validation

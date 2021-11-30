import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routingComponents } from 'src/app/app-routing.module';

import { Login } from 'src/app/interfaces/login';

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

    //CHECK TO SEE IF USER IS LOGGED IN, IF SO REDIRECT #####

    // if (localStorage.getItem("loggedIn") == "true")
    // {
    //     this.router.navigate(['/dashboard']);
    // }

  }
  onSubmit(): void {
    this.http
      .post('http://localhost:3000/user/login', this.loginForm.value)
      .subscribe(
        // (response) => localStorage.setItem('userDetails', JSON.stringify(response)),
        (response) => sessionStorage.setItem('userID', JSON.stringify(response)),
        (error) => (this.err = error.error.msg)
      );
  }
}

//https://angular.io/guide/reactive-forms
//https://angular.io/guide/reactive-forms#basic-form-validation

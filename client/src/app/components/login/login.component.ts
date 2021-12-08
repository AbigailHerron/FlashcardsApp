import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routingComponents } from 'src/app/app-routing.module';

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

  constructor(private http: HttpClient, private service: BackendService, private router: Router) { }

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
  onSubmit() {
    
    this.service.login(this.loginForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        }
        ,
        (error) => (this.err = error.error.msg)
      );
  }
}

//https://angular.io/guide/reactive-forms
//https://angular.io/guide/reactive-forms#basic-form-validation

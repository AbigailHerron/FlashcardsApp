import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  submitted = false;
  authError = false;
  authErrorMsg!: string;

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private session: SessionService) {}

  ngOnInit() { }
  
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.session.login(this.loginForm.value)
      .subscribe((res) => {
          // Successful login
          console.log(res),
          this.router.navigate(['/dashboard'])
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

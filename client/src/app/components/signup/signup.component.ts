import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  submitted = false;
  authError = false;
  authErrorMsg!: string;

  signupForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  signup: any;

  constructor(private router: Router, private service: SessionService) {}

  ngOnInit() { }

  onSubmit() {
    this.submitted = true; 

    if (this.signupForm.invalid) {
      return;
    }

    this.service.signup(this.signupForm.value)
      .subscribe(() => {
        // Successful signup
        this.router.navigate(['/dashboard']);
      },
        (error) => {
          // Failed signup
          this.authError = true;
          (this.authErrorMsg = error.error.msg)
        });
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

import { Location } from '@angular/common';
import { SessionQuery } from 'src/app/store/session.query';
import { BackendService } from 'src/app/services/backend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User | null;

  userForm!: FormGroup;

  constructor(private _location: Location, private session: SessionQuery, private backendService: BackendService) { 

    this.session.userDetailsState$.subscribe(res => this.user = res);
  }

  ngOnInit(): void {

    this.userDataInitialiser();

    var x = document.getElementById("editUserName")!;
    x.style.display = "none";

    var x = document.getElementById("editEmail")!;
    x.style.display = "none";
    


    console.log(this.user);
  }

  userDataInitialiser() {

    this.userForm = new FormGroup({
      userName: new FormControl(this.user?.UserName, Validators.required),
      email: new FormControl(this.user?.UserEmail, [Validators.required, Validators.email])
    })
  }

  backClicked() {
    this._location.back();
  }

  showEditUserNameForm() {

    var x = document.getElementById("editUserName")!;

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  showEditEmailForm() {

    var x = document.getElementById("editEmail")!;

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  updateUserName() {

    console.log('In updateUserName()');

    console.log(this.userForm.value.userName);

    this.backendService.updateUserName(this.userForm.value.userName).subscribe(res => console.log(res));
  }

  updateEmail() {

    console.log('In updateEmail()');

    this.backendService.updateEmail(this.userForm.value.email);
  }

  deleteAccount() {

    console.log('In deleteAccount()');

    this.backendService.deleteAccount();
  }
}

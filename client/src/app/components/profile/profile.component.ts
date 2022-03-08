import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { BackendService } from 'src/app/services/backend.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined = (JSON.parse(localStorage.getItem('currentUser') || '{}')) ;

  constructor(private backEndService : BackendService, private _location: Location) { }

  ngOnInit(): void {

    var x = document.getElementById("editDetails")!;
    x.style.display = "none";

    this.backEndService.getProfileDetails()
      .subscribe((res) => {
        this.user = res;
      },
      (error) => {
        console.log(error);
      })
  }

  backClicked() {
    this._location.back();
  }

  showEditDetailsForm() {

    var x = document.getElementById("editDetails")!;

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

   
}

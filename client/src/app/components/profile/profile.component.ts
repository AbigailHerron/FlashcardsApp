import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { BackendService } from 'src/app/services/backend.service';

import { Location } from '@angular/common';
import { SessionQuery } from 'src/app/store/session.query';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User | null; // = (JSON.parse(localStorage.getItem('currentUser') || '{}'));

  constructor(private _location: Location, private session: SessionQuery) { }

  ngOnInit(): void {

    var x = document.getElementById("editDetails")!;
    x.style.display = "none";

    this.user = this.session.$userDetails;

    console.log(this.user);
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

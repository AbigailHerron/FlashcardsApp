import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Location } from '@angular/common';
import { SessionQuery } from 'src/app/store/session.query';

import { resetStores } from "@datorama/akita";
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(public router: Router, private _location: Location, private authQuery: SessionQuery) { }

  userID$!: Observable<number>;
  
  ngOnInit(): void {
    this.userID$ = this.authQuery.userID$;
  }

  logOut() {

    console.log("logOut() method called");
    resetStores();
    this.router.navigate(['']);
  }

  backClicked() {
    this._location.back();
  }

}

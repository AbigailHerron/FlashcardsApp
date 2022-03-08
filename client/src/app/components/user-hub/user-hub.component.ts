import { Component, OnInit } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { Observable, of, throwError } from 'rxjs';

import { Location } from '@angular/common';

@Component({
  selector: 'app-user-hub',
  templateUrl: './user-hub.component.html',
  styleUrls: ['./user-hub.component.css']
})
export class UserHubComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }
}

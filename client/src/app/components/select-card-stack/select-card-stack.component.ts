import { Component, OnInit } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

import { BackendService } from 'src/app/services/backend.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-select-card-stack',
  templateUrl: './select-card-stack.component.html',
  styleUrls: ['./select-card-stack.component.css']
})
export class SelectCardStackComponent implements OnInit {

  public Stack: IcardStack[] = [];
  message: string = "";

  constructor(private srvCardStacks: CardStackServiceService, private backEndService: BackendService) { }

  // Retrieve user details from local storage + send user ID in req.body

  ngOnInit():  void {
    const user = this.backEndService.userValue;

    const userID = user?.UserID;

    this.srvCardStacks.getCardStacks().subscribe({
      next: (value: IcardStack[])=> this.Stack = value,
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })
  }
}

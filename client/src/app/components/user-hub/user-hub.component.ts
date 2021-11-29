import { Component, OnInit } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

@Component({
  selector: 'app-user-hub',
  templateUrl: './user-hub.component.html',
  styleUrls: ['./user-hub.component.css']
})
export class UserHubComponent implements OnInit {

  public Stack: IcardStack[] = [];

  constructor(private srvCardStacks: CardStackServiceService) { }

  ngOnInit(): void {
    this.Stack = this.srvCardStacks.getCardStacks();
  }

}

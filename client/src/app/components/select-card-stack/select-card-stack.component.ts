import { Component, OnInit } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

@Component({
  selector: 'app-select-card-stack',
  templateUrl: './select-card-stack.component.html',
  styleUrls: ['./select-card-stack.component.css']
})
export class SelectCardStackComponent implements OnInit {

  public Stack: IcardStack[] = [];
  message: string = "";

  constructor(private srvCardStacks: CardStackServiceService) { }

  ngOnInit():  void {
    this.srvCardStacks.getCardStacks().subscribe({
      next: (value: IcardStack[])=> this.Stack = value,
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Icard } from 'src/app/interfaces/icard';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';

@Component({
  selector: 'app-view-stack',
  templateUrl: './view-stack.component.html',
  styleUrls: ['./view-stack.component.css']
})
export class ViewStackComponent implements OnInit {
  currentCardStack!: IcardStack;
  cardsArray : Icard[] = [];
  message : string = '';
  indexCounter: number = 0;
  isFlipped: boolean = false;

  constructor(private srvCardStacks: CardStackServiceService) { 
    this.currentCardStack = this.srvCardStacks.deckDetails;
  }

  ngOnInit(): void {
    
    //GET CARDS FROM STACK

    this.getCardsFromStack();

    console.log(this.cardsArray);
  }

  getCardsFromStack() {
    this.srvCardStacks.getCardsFromStack().subscribe({
      next: (value: Icard[])=> this.cardsArray = value,
      complete: () => console.log(this.cardsArray),
      error: (mess) => this.message = mess
    })
  }

  flipCard() {

    if (this.isFlipped == false)
    {
      this.isFlipped = true;
    }
    else
    this.isFlipped = false;

  }

  nextCard() {

    this.indexCounter++;

    if (this.isFlipped == true)
    {
    this.isFlipped = false;
    }

  }
}

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
  //isFlipped: boolean = false;

  constructor(private srvCardStacks: CardStackServiceService) {

    this.srvCardStacks.cardStackSource.subscribe(cardStackSource => this.currentCardStack = cardStackSource)
    // this.srvCardStacks.deckValue(this.currentCardStack);

  }

  ngOnInit(): void {
    
    //GET CARDS FROM STACK
    this.getCardsFromStack();

    //Retrieve index if any
    this.indexCounter = parseInt(sessionStorage.getItem('index') || '0');

    // We need to clear the index of a saved card stack if we enter a new card stack - or save progress in each stack

    console.log(this.cardsArray);
  }

  getCardsFromStack() {
    this.srvCardStacks.getCardsFromStack().subscribe({
      next: (value: Icard[])=> this.cardsArray = value,
      complete: () => console.log(this.cardsArray),
      error: (mess) => this.message = mess
    })
  }

  // flipCard() {

  //   if (this.isFlipped == false)
  //   {
  //     this.isFlipped = true;
  //   }
  //   else
  //   this.isFlipped = false;

  // }

  nextCard() {

    if (this.indexCounter != this.cardsArray.length - 1)
    {
      this.indexCounter++;
    }

    sessionStorage.setItem("index", this.indexCounter.toString())

    // if (this.isFlipped == true)
    // {
    // this.isFlipped = false;
    // }

  }

  previousCard() {

    if (this.indexCounter != 0)
    {
      this.indexCounter--;
    }


    sessionStorage.setItem("index", this.indexCounter.toString())

    // if (this.isFlipped == true)
    // {
    // this.isFlipped = false;
    // }

  }
}

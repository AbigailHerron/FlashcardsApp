import { Component, OnInit } from '@angular/core';
import { Icard } from 'src/app/interfaces/icard';
import { IcardStack } from 'src/app/interfaces/icard-stack';
// import { Istacksettings } from 'src/app/interfaces/istacksettings';
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
  isFlipped: boolean = false; // Needed if stackOptions.inputs == true 
  countdown!: number;
  stackSettings!: any; // Should be Istacksettings

  constructor(private srvCardStacks: CardStackServiceService) {

  }

  ngOnInit(): void {
    
    this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}'); // Setting currentCardStack

    // Retrieve cards from stack
    this.getCardsFromStack();

    // Retrieve selected options for stack
    // this.stackSettings = this.srvCardStacks.deckOptionsDetails; // Option 1
    this.stackSettings = JSON.parse(sessionStorage.getItem('stackOptions') || '{}'); // Option 2

    if (this.stackSettings.timerLength != null)
    {
      this.timer();
    }

    //Retrieve index if any
    this.indexCounter = parseInt(sessionStorage.getItem('index') || '0');

    // We need to clear the index of a saved card stack if we enter a new card stack - or save progress in each stack
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

    if (this.indexCounter != this.cardsArray.length - 1)
    {
      this.indexCounter++;
    }

    sessionStorage.setItem("index", this.indexCounter.toString())

    if (this.isFlipped == true)
    {
    this.isFlipped = false;
    }
  }

  previousCard() {

    if (this.indexCounter != 0)
    {
      this.indexCounter--;
    }

    sessionStorage.setItem("index", this.indexCounter.toString())

    if (this.isFlipped == true)
    {
    this.isFlipped = false;
    }
  }

  timer() {

    this.countdown = this.stackSettings.timerLength; // Setting countdown

    console.log("Countdown value is " + this.countdown)

    setInterval(() => {
      // runs every 1 seconds
      this.countdown--;
    }, 1000)
  }
}

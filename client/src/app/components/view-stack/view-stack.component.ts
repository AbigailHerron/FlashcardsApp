import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icard } from 'src/app/interfaces/icard';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { Istacksettings } from 'src/app/interfaces/istacksettings';
// import { Istacksettings } from 'src/app/interfaces/istacksettings';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { CardStackQuery } from 'src/app/store/card-stack.query';

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
  stackSettings!: Istacksettings; // Should be Istacksettings
  interval: any;

  progress: number = 0;
  progressString!: string;

  cardForm!: FormGroup;
  isCorrect!: boolean;

  answeredCorrectly: string[] = [];

  constructor(private srvCardStacks: CardStackServiceService, private router: Router, private cardStackQuery: CardStackQuery) {

    this.cardStackQuery.currentStack$.subscribe(res => this.currentCardStack = res);

    
   }

  ngOnInit(): void {

    this.cardForm = new FormGroup({
      answer: new FormControl('', [Validators.required])
    })
    
    // this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}'); // Setting currentCardStack

    // Retrieve cards from stack
    this.getCardsFromStack();

    // Retrieve selected options for stack
    // this.stackSettings = this.srvCardStacks.deckOptionsDetails; // Option 1
    this.stackSettings = JSON.parse(sessionStorage.getItem('stackOptions') || '{}'); // Option 2

    if (this.stackSettings.TimerLength != null)
    {
      this.timer();
    }

    //Retrieve index if any
    //this.indexCounter = parseInt(sessionStorage.getItem('index') || '0');

    // We need to clear the index of a saved card stack if we enter a new card stack - or save progress in each stack
  }

  getCardsFromStack() {

    this.stackSettings = JSON.parse(sessionStorage.getItem('stackOptions') || '{}');

    console.log('In getCardsFromStack() | view-stack-component.ts');

    console.log(this.stackSettings);

    if (this.stackSettings.ViewCardsDue == true)
    {
      console.log('Calling service method getCardsFromStack()')

      this.srvCardStacks.getCardsFromStack().subscribe({
        next: (value: Icard[])=> this.cardsArray = value,
        complete: () => console.log(this.cardsArray),
        error: (mess) => this.message = mess
      })
    }
    else if (this.stackSettings.ViewCardsDue == false)
    {
      console.log('Calling service method getAllCardsFromStack()')

      this.srvCardStacks.getAllCardsFromStack().subscribe({
        next: (value: Icard[])=> this.cardsArray = value,
        complete: () => console.log(this.cardsArray),
        error: (mess) => this.message = mess
      })
    }




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

    if (this.isFlipped == true) // Returning card side to front
    {
    this.isFlipped = false;
    }

    if (this.indexCounter != this.cardsArray.length - 1)
    {
      this.indexCounter++;

      this.progress = (this.indexCounter / this.cardsArray.length)

      console.log(this.progress);

    }

    sessionStorage.setItem("index", this.indexCounter.toString())
  }

  previousCard() {

    if (this.indexCounter != 0)
    {
      this.indexCounter--;

      this.progress = (this.indexCounter / this.cardsArray.length)
    }

    sessionStorage.setItem("index", this.indexCounter.toString())

    if (this.isFlipped == true) // Returning card side to front
    {
    this.isFlipped = false;
    }
  }

  timer() {
    this.countdown = this.stackSettings.TimerLength; // Setting countdown

    this.interval = setInterval(() => {
      // runs every 1 seconds

      if (this.countdown < 0) {
        clearInterval(this.interval);
      }

      this.countdown--;
    }, 1000)
  }

  onSubmit() {

    clearInterval(this.interval);

    var button = (document.getElementById("submitButton") as HTMLButtonElement); // Useful
    button.disabled = true;

    var input = (document.getElementById("answer") as HTMLInputElement);
    input.disabled = true;

    this.isFlipped = true;

    var answer = this.cardForm.value.answer;
    this.isCorrect = this.compareAnswers(answer);

    setTimeout(() => {
      // After 5 seconds we move onto the next card in the array

      if (this.indexCounter == this.cardsArray.length - 1)
      {
        this.finish();
      }
      else
      {
        this.nextCard();

        button.disabled = false;
        input.disabled = false;
  
        input.value = '';

        this.timer();
      }
    }, 1000);
  }

  compareAnswers(answer: any) : boolean {

    console.log(answer);

    this.stackSettings = JSON.parse(sessionStorage.getItem('stackOptions') || '{}');

    console.log('In compareAnswers() | view-stack-component.ts');

    console.log(this.stackSettings);

      if (answer.toString() == this.cardsArray[this.indexCounter].Back)
      {
        this.answeredCorrectly.push('Correct');

        if (this.stackSettings.ViewCardsDue == true)
        {
          console.log('Setting card to easy')
          this.setToEasy();
        }

        return true;
      }
      else 
      {
        this.answeredCorrectly.push('Incorrect');

        if (this.stackSettings.ViewCardsDue == true)
        {
          console.log('Setting card to hard')
          this.setToHard();
        }

        return false;
      }
  }

  finish() { // This function should be able to be called also when user views stacks without inputs

    sessionStorage.setItem('answeredCorrectly', JSON.stringify(this.answeredCorrectly));

    if (this.stackSettings.Inputs == true)
    {
      this.router.navigate(['/viewresults']);
    }
    else
    {
      this.router.navigate(['/userhub']);
    }
  }

  // this.srvCardStacks.getCardsFromStack().subscribe({
  //   next: (value: Icard[])=> this.cardsArray = value,
  //   complete: () => console.log(this.cardsArray),
  //   error: (mess) => this.message = mess
  // })

  setToEasy() {
    
    this.srvCardStacks.setCardToEasy(this.cardsArray[this.indexCounter]);

    console.log('Card set to easy');
  }

  setToHard() {
    this.srvCardStacks.setCardToHard(this.cardsArray[this.indexCounter]);

    console.log('Card set to hard')
  }
}

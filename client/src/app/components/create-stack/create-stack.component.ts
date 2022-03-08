import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Icard } from 'src/app/interfaces/icard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-stack',
  templateUrl: './create-stack.component.html',
  styleUrls: ['./create-stack.component.css']
})
export class CreateStackComponent implements OnInit {
  currentCardStack!: IcardStack;

  constructor(private router: Router, private srvCardStacks: CardStackServiceService) {
     this.currentCardStack = this.srvCardStacks.deckDetails;
   }

  //private cardStackSource = this.srvCardStacks.deckDetails;

  cardsArray : Icard[] = [];
  stackDetailsForm! : FormGroup;
  message : string = '';


  ngOnInit(): void {

    this.stackDetailsForm = new FormGroup({
      deckname: new FormControl(this.currentCardStack?.DeckName, [Validators.required, Validators.minLength(3)]),
      about: new FormControl(this.currentCardStack?.About, [Validators.required, Validators.minLength(3)]),
      publicDeck: new FormControl(this.currentCardStack?.PublicDeck, [Validators.required])
    })

    //GET CARDS FROM STACK

    this.getCardsFromStack();
  }

  //ADD NEW CARD TO STACK

  addNewCard() {
    this.srvCardStacks.addBlankCardToStack();
    this.getCardsFromStack();
  }

  //UPDATE CARDSTACK DETAILS

  onSubmit() {

    console.log(this.currentCardStack);

    this.srvCardStacks.updateCardStack(this.stackDetailsForm.value, this.currentCardStack.DeckID)
    .subscribe({
      next: res => {
        console.log(res);
      },
      error: (err) => this.message = err,
      complete: () => this.router.navigate(['/userhub']),
    })
  }

  getCardsFromStack() {
    this.srvCardStacks.getAllCardsFromStack().subscribe({
      next: (value: Icard[])=> this.cardsArray = value,
      complete: () => console.log(this.cardsArray),
      error: (mess) => this.message = mess
    })
  }
}

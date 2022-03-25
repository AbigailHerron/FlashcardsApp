import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-card-stack',
  templateUrl: './select-card-stack.component.html',
  styleUrls: ['./select-card-stack.component.css']
})
export class SelectCardStackComponent implements OnInit {
  @Input() cstack!: IcardStack;

  cardStackDetails = new FormGroup({
    DeckName: new FormControl('', Validators.required),
    About: new FormControl('', Validators.required)
  });

  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;

  public Stack: IcardStack[] = [];
  message: string = "";

  currentCardStack!: IcardStack;

  constructor(private srvCardStacks: CardStackServiceService, private router: Router) { }

  ngOnInit():  void {

    this.getCardStacks();
  }

  // Setting deckValue as cardstack that is clicked

  clicked (cardStack: IcardStack): void {

    console.table(cardStack);

    this.srvCardStacks.deckValue(cardStack)
  }

  // Open Modal

  openDialog(){
    this.btnShow.nativeElement.click();
  }

  // Close modal

  closeDialog(){
    this.btnClose.nativeElement.click();
  }

  // Adding a new stack

  addNewStack() {

    console.log("addNewStack() called");

    console.table(this.cardStackDetails?.value);

      this.srvCardStacks.addCardToStack(this.cardStackDetails?.value);

      this.btnClose.nativeElement.click();

      this.getCardStacks();
  }

  // Retrieving cardstacks

  getCardStacks() {

    this.srvCardStacks.getCardStacks().subscribe({
      next: (value: IcardStack[])=> this.Stack = value,
      error: (mess) => this.message = mess
    })
  }

  // Editing a card stack (implements the create-stack component interfaces)

  goToEditCardStack() {

    this.router.navigate(['/createstack']);
  }

  // Open menu for selected card stack

  goToViewCardStackMenu(stack: IcardStack) {

    this.srvCardStacks.changeStack(stack);

    this.router.navigate(['/viewstackmenu']);
  }

  isSelected(cardStack: IcardStack): boolean {
    if (!cardStack || !this.currentCardStack) {
      return false;
    }
    else {
      return cardStack.DeckID === this.currentCardStack.DeckID;
    }
  }

  // Deleting a card stack

  deleteCard(stack: IcardStack) {

    this.srvCardStacks.changeStack(stack);
    
    console.log('deleteCard()');

    this.srvCardStacks.deleteCardStack();

    this.getCardStacks();
  }
}

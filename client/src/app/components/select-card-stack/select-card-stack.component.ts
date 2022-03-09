import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private srvCardStacks: CardStackServiceService, private router: Router, private modalService: NgbModal) { }

  // Retrieve user details from local storage + send user ID in req.body

  ngOnInit():  void {

    this.getCardStacks();
  }

  // currentCardStack is set when a card stack is clicked/selected

  clicked (cardStack: IcardStack): void {
    this.currentCardStack = cardStack;
    console.table(this.currentCardStack);

    this.srvCardStacks.deckValue(this.currentCardStack)

    sessionStorage.setItem('stack', JSON.stringify(cardStack)); // Option 2 
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

    console.log("component method addNewStack() called");
    console.log(this.cardStackDetails?.value);

      this.srvCardStacks.addCardToStack(this.cardStackDetails?.value).subscribe(
        {
      next: value => {
        console.log(value),
        this.srvCardStacks.deckValue(value),
        this.btnClose.nativeElement.click(),
        this.router.navigate(['/createstack'])
      },
      complete: () =>
        console.log(this.srvCardStacks.deckDetails)
      ,
      error: (err) => this.message = err
    });

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

  goToViewCardStackMenu(stack: IcardStack) {

    // this.clicked(stack); // Option 1

    sessionStorage.setItem('stack', JSON.stringify(stack)); // Option 2 

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

  deleteCard() {
    this.srvCardStacks.deleteCardStack(this.currentCardStack);
    this.getCardStacks();
  }
}

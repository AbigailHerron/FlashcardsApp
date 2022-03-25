import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-select-public-stack',
  templateUrl: './select-public-stack.component.html',
  styleUrls: ['./select-public-stack.component.css']
})
export class SelectPublicStackComponent implements OnInit {
  @Input() cstack!: IcardStack;

  public Stack: IcardStack[] = [];
  message: string = "";

  currentCardStack!: IcardStack;

  constructor(private srvCardStacks: CardStackServiceService, private router: Router, private _location: Location) { }

  ngOnInit(): void {

    this.getCardStacks();

  }

  // Setting deckValue as cardstack that is clicked

  clicked (cardStack: IcardStack): void {

    console.table(cardStack);

    this.srvCardStacks.deckValue(cardStack);

  }

  backClicked() {

    this._location.back();

  }

  // Retrieving cardstacks

  getCardStacks() {

    this.srvCardStacks.getPublicCardStacks().subscribe({
      next: (value: IcardStack[])=> {this.Stack = value, console.log(value)},
      error: (mess) => this.message = mess
    })
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
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';

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

  constructor(private srvCardStacks: CardStackServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getCardStacks();
  }

  // currentCardStack is set when a card stack is clicked/selected

  clicked (cardStack: IcardStack): void {
    this.currentCardStack = cardStack;
    console.table(this.currentCardStack);

    this.srvCardStacks.deckValue(this.currentCardStack)

    sessionStorage.setItem('stack', JSON.stringify(cardStack)); // Option 2 
  }

  // Retrieving cardstacks

  getCardStacks() {

    this.srvCardStacks.getPublicCardStacks().subscribe({
      next: (value: IcardStack[])=> {this.Stack = value, console.log(value)},
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })
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

}

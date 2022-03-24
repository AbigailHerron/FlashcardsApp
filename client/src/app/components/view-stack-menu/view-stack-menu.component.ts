import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { Router } from '@angular/router';
import { CardStackQuery } from 'src/app/store/card-stack.query';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-stack-menu',
  templateUrl: './view-stack-menu.component.html',
  styleUrls: ['./view-stack-menu.component.css']
})
export class ViewStackMenuComponent implements OnInit {

  currentCardStack!: IcardStack;
  numberOfCardsDue!: number;
  // viewCardsDue!: boolean

  currentUserID!: number;

  viewStackForm = new FormGroup({
    Hints: new FormControl(false, Validators.required),
    Timer: new FormControl(false, Validators.required),
    Inputs: new FormControl(false, Validators.required),
    TimerLength: new FormControl(null, Validators.required),
    ViewCardsDue: new FormControl(false, Validators.required)
  });

  constructor(private router: Router, private cardStackQuery: CardStackQuery, private sessionService: SessionService) {

    this.cardStackQuery.currentStack$.subscribe(res => this.currentCardStack = res);
    this.cardStackQuery.cardsDue$.subscribe(res => this.numberOfCardsDue = res)

    this.currentUserID = this.sessionService.UserID;
   }

  ngOnInit(): void {



    console.log('In view-stack-menu.component.ts')
    console.log('Current card stack : ' + this.currentCardStack.DeckName);

    var button = (document.getElementById("viewDueCardsButton") as HTMLButtonElement); // Useful

    if (this.numberOfCardsDue == 0)
    {
      button.disabled = true;
    }
  }

  onSubmit() {

  }

  viewDueCards() {

    console.log('In viewDueCards()');

    this.viewStackForm.controls['ViewCardsDue'].setValue(true);

    console.log('viewDueCards() viewStackForm.viewCardsDue: ' + this.viewStackForm.value.viewCardsDue);

    sessionStorage.setItem('stackOptions', JSON.stringify(this.viewStackForm.value)); // Option 2 

    this.router.navigate(['/viewstack']);
  }

  viewAllCards() {

    console.log('In viewAllCards()');

    this.viewStackForm.controls['ViewCardsDue'].setValue(false);

    console.log('viewDueCards() viewStackForm.viewCardsDue: ' + this.viewStackForm.value.viewCardsDue);

    sessionStorage.setItem('stackOptions', JSON.stringify(this.viewStackForm.value)); // Option 2 

    this.router.navigate(['/viewstack']);
  }
}

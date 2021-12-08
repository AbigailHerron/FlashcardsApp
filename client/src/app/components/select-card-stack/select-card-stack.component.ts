import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

import { BackendService } from 'src/app/services/backend.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

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
  @Input() cardStack!: IcardStack;

  cardStackDetails = new FormGroup({
    DeckName: new FormControl('', Validators.required),
    About: new FormControl('', Validators.required),
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
    this.srvCardStacks.getCardStacks().subscribe({
      next: (value: IcardStack[])=> this.Stack = value,
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })
  }

  openDialog(){
    this.btnShow.nativeElement.click();
  }

  closeDialog(){
    this.btnClose.nativeElement.click();
  }

  addNewStack() {
    console.log("Creating card stack");

      this.srvCardStacks.addCardToStack({ ...this.cardStackDetails?.value }).subscribe(
        {
      next: details => {
        console.log(JSON.stringify(details) + ' has been added');
        this.message = "new stack has been added";

        this.btnClose.nativeElement.click();

        this.router.navigate(['/createstack']);
      },
      error: (err) => this.message = err
    });

    this.srvCardStacks.getCardStacks().subscribe({
      next: (value: IcardStack[])=> this.Stack = value,
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })
  }

  goToEditCardStack() {
    this.router.navigate(['/createstack']);

    //this.router.navigateByUrl('/createstack');
  }

  clicked (cardStack: IcardStack): void {
    this.currentCardStack = cardStack;
    console.table(this.currentCardStack);
  }

  isSelected(cardStack: IcardStack): boolean {
    if (!cardStack || !this.currentCardStack) {
      return false;
    }
    else {
      return cardStack.DeckID === this.currentCardStack.DeckID;
    }
  }

  delectCard() {
    this.srvCardStacks.deleteCardStack(this.currentCardStack);
  }
}

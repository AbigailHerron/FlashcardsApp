import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { IcardStack } from 'src/app/interfaces/icard-stack';

import { BackendService } from 'src/app/services/backend.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';



@Component({
  selector: 'app-select-card-stack',
  templateUrl: './select-card-stack.component.html',
  styleUrls: ['./select-card-stack.component.css']
})
export class SelectCardStackComponent implements OnInit {

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

  constructor(private srvCardStacks: CardStackServiceService) { }

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

      this.srvCardStacks.addCardToStack({ ...this.cardStackDetails?.value }).subscribe({
      next: details => {
        console.log(JSON.stringify(details) + ' has been added');
        this.message = "new stack has been added";
      },
      error: (err) => this.message = err
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Icard } from 'src/app/interfaces/icard';

@Component({
  selector: 'app-create-stack',
  templateUrl: './create-stack.component.html',
  styleUrls: ['./create-stack.component.css']
})
export class CreateStackComponent implements OnInit {
  currentCardStack!: IcardStack;

  constructor(private http: HttpClient, private srvCardStacks: CardStackServiceService) { }

  private cardStackSource = new BehaviorSubject<IcardStack>(this.currentCardStack)

  cardsArray : Icard[] = [];
  stackDetailsForm! : FormGroup;
  message : string = '';

  ngOnInit(): void {
    this.stackDetailsForm = new FormGroup({
      deckname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      about: new FormControl('', [Validators.required, Validators.minLength(3)])
    })

    this.srvCardStacks.getCardsFromStack().subscribe({
      next: (value: Icard[])=> this.cardsArray = value,
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })

  }

  // getCardsFromStack()
  // {
  //   this.srvCardStacks.getCardsFromStack().subscribe({
  //     next: (value: Icard[])=> this.cardsArray = value,
  //     complete: () => console.log(),
  //     error: (mess) => this.message = mess
  //   })

  // }

  addCard(number: number) {
    // this.cardsArray.push(number);

  }

  //____________________ Calling addCardtoStack method from CardStackServiceServices

  onSubmit() {
    //  console.table(this.stackDetailsForm?.value);

  }
}

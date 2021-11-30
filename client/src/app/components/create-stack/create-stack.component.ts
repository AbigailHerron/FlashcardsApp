import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';

@Component({
  selector: 'app-create-stack',
  templateUrl: './create-stack.component.html',
  styleUrls: ['./create-stack.component.css']
})
export class CreateStackComponent implements OnInit {

  constructor(private http: HttpClient, private srvCardStacks: CardStackServiceService) { }

  cardsArray : number[] = [0];
  stackDetailsForm! : FormGroup;
  message : string = '';


  ngOnInit(): void {
    this.stackDetailsForm = new FormGroup({
      deckname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      about: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  addCard(number: number) {
    this.cardsArray.push(number);
  }

  onSubmit() {
    // console.log('forms submitted with ');
    // console.table(this.stackDetailsForm?.value);

    this.srvCardStacks.addCardToStack({ ...this.stackDetailsForm?.value }).subscribe({
      next: details => {
        console.log(JSON.stringify(details) + ' has been added');
        this.message = "new stack has been added";
      },
      error: (err) => this.message = err
    });
  }
}

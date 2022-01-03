import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Icard } from 'src/app/interfaces/icard';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-card-item',
  templateUrl: './create-card-item.component.html',
  styleUrls: ['./create-card-item.component.css']
})
export class CreateCardItemComponent implements OnInit {
@Input() card!: Icard;
@Output("getCardsFromStack") getCardsFromStack: EventEmitter<any> = new EventEmitter();

cardForm!: FormGroup;
message : string = '';

  constructor(private srvCardStacks: CardStackServiceService) { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      front: new FormControl([this.card?.Front]) ,
      back: new FormControl([this.card?.Back])
      // ,imgUrl: new FormControl([this.card?.ImageURL])
    })
  }

  get front() {
    return this.cardForm?.get('front');
  }
  get back() {
    return this.cardForm?.get('back');
  }

  get imgUrl() {
    return this.cardForm?.get('imgUrl');
  }

  deleteCardFromStack() {
    this.srvCardStacks.deleteCardFromStack(this.card);

    this.getCardsFromStack.emit();
  }

  updateCardFromStack() {
    this.srvCardStacks.updateCardFromStack(this.card.CardID, this.cardForm.value)
    .subscribe({
      next: card => {
        console.log(JSON.stringify(card) + ' has been updated');
      },
      complete: () => this.getCardsFromStack.emit(),
      error: (err) => this.message = err
    })
  }
}

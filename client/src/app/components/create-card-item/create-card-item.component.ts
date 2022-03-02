import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Icard } from 'src/app/interfaces/icard';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-card-item',
  templateUrl: './create-card-item.component.html',
  styleUrls: ['./create-card-item.component.css'],
})
export class CreateCardItemComponent implements OnInit {
  @Input() card!: Icard;
  @Output('getCardsFromStack') getCardsFromStack: EventEmitter<any> =
    new EventEmitter();

  cardForm!: FormGroup;
  imageForm!: FormGroup;
  message: string = '';
  errorMessage: any;

  constructor(
    private srvCardStacks: CardStackServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cardDataInitialiser();
    this.imageForm = this.formBuilder.group({ data: [''] });
  }

  cardDataInitialiser(): void {
    this.cardForm = new FormGroup({
      front: new FormControl([this.card?.Front]),
      back: new FormControl([this.card?.Back]),
      imageID: new FormControl([this.card?.ImageID]),
      imageURL: new FormControl([this.card?.ImageURL]),
    });
  }

  styleUpload(): object {
    return { display: this.card?.ImageURL ? 'block' : 'none' };
  }
  handleUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.get('data')?.setValue(file);
    }

    const formData = new FormData();
    formData.append('file', this.imageForm.get('data')?.value);

    this.srvCardStacks.uploadImage(formData, this.card.CardID);
  }
  handleDelete() {
    //
  }

  get front() {
    return this.cardForm?.get('front');
  }
  get back() {
    return this.cardForm?.get('back');
  }

  get imgUrl() {
    return this.cardForm?.get('imageURL');
  }

  deleteCardFromStack() {
    this.srvCardStacks.deleteCardFromStack(this.card);

    this.getCardsFromStack.emit();
  }

  updateCardFromStack() {
    console.log(this.card.CardID);

    this.srvCardStacks
      .updateCardFromStack(this.card.CardID, this.cardForm.value)
      .subscribe({
        next: (card) => {
          console.log(JSON.stringify(card) + ' has been updated');
        },
        complete: () => this.getCardsFromStack.emit(),
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}

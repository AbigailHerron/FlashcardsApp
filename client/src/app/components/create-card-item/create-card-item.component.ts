import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Icard } from 'src/app/interfaces/icard';

@Component({
  selector: 'app-create-card-item',
  templateUrl: './create-card-item.component.html',
  styleUrls: ['./create-card-item.component.css']
})
export class CreateCardItemComponent implements OnInit {

@Input() card?: Icard;
cardForm!: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      front: new FormControl([this.card?.Front]) ,
      back: new FormControl([this.card?.Back]),
      imgUrl: new FormControl([this.card?.ImageURL])
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

}

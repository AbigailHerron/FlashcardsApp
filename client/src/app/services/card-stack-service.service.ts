import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';

@Injectable({
  providedIn: 'root'
})
export class CardStackServiceService {

  constructor() { }

  private dummyCardStackData : IcardStack[] = 
    [{
      "id": "1",
      "title": "My First Stack",
      "description": "This is my first card stack!",
      "tags": [
        "tagOne",
        "tagTwo",
        "tagThree",
        "tagFour"
      ],
      "creator": "CM",
      "creatorID": "S00197425"
    },
    {
      "id": "2",
      "title": "My Second Stack",
      "description": "This is my second card stack!",
      "tags": [
        "tagFive",
        "tagSix",
        "tagThree",
        "tagOne"
      ],
      "creator": "CM",
      "creatorID": "S00197425"
    },
    {
      "id": "3",
      "title": "My Third Stack",
      "description": "This is my third card stack!",
      "tags": [
        "tagFive",
        "tagSix",
        "tagThree",
        "tagOne"
      ],
      "creator": "CM",
      "creatorID": "S00197425"
    },
    {
      "id": "4",
      "title": "My Fourth Stack",
      "description": "This is my fourth card stack!",
      "tags": [
        "tagFive",
        "tagSix",
        "tagThree",
        "tagOne"
      ],
      "creator": "CM",
      "creatorID": "S00197425"
    },
    {
      "id": "5",
      "title": "My Fifth Stack",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis hendrerit pretium. Vestibulum feugiat ante ac dolor sodales, sit amet pellentesque sapien dictum. Donec eget sollicitudin velit. Ut bibendum ut ante nec finibus. Praesent at pharetra sem. Etiam pharetra feugiat metus, in ultrices arcu. Nulla ut posuere massa. Donec pellentesque urna ac porttitor porttitor. Vestibulum cursus diam in cursus sodales. Integer consequat semper ipsum, a cursus lacus elementum vitae.",
      "tags": [
        "tagFive",
        "tagSix",
        "tagThree",
        "tagOne"
      ],
      "creator": "CM",
      "creatorID": "S00197425"
    }
  ]

  getCardStacks(): IcardStack[]{
    console.log('Dummy getCardStackData called');

    return this.dummyCardStackData;
  }

}

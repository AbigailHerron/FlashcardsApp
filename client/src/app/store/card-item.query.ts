import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { IcardStack } from '../interfaces/icard-stack';
import { CardItemStore, CardItemState } from './card-item.store';

@Injectable({ providedIn: 'root' })
export class CardStackQuery extends Query<CardItemState> {

  // Observable
  currentCard$ = this.select(
    [
      'CardID', 'DeckID',
      'Front', 'Back',
      'ImageID','ImageURL'
    ]
  );

  currentStackState$ = this.select(
    [
      state => state.CardID, state => state.DeckID,
      state => state.Front, state => state.Back,
      state => state.ImageID,state => state.ImageURL
    ]
  );

  currentCardAll$ = this.select();

  // Value

  cardStackID$ = this.select('DeckID');

  constructor(protected store: CardItemStore) {
    super(store);
  }
}
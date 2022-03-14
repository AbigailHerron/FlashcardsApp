import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { IcardStack } from '../interfaces/icard-stack';
import { CardStackStore, CardStackState } from './card-stack.store';

@Injectable({ providedIn: 'root' })
export class CardStackQuery extends Query<CardStackState> {

  // Observable
  currentStack$ = this.select(
    [
      'UserName', 'DeckID',
      'About', 'DeckName',
      'UserID','PublicDeck',
      'Colour', 'CardsDue'
    ]
  );

  currentStackState$ = this.select(
    [
      state => state.UserName, state => state.DeckID,
      state => state.About, state => state.DeckName,
      state => state.UserID,state => state.PublicDeck,
      state => state.Colour, state => state.CardsDue
    ]
  );

  currentStackAll$ = this.select();

  // Value
  currentStackValue$ = this.getValue();

  cardStackID$ = this.getValue().DeckID;
  

  constructor(protected store: CardStackStore) {
    super(store);
  }
}
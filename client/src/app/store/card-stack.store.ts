import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface CardStackState {
    UserName: string | undefined,
    DeckID: number,
    About: string, 
    DeckName: string,
    UserID: number,
    PublicDeck: boolean,
    Colour: string,
    CardsDue: number
}

export function createInitialState(): CardStackState {
    return {
        UserName: '',
        DeckID: 0,
        About: '',
        DeckName: '',
        UserID: 0,
        PublicDeck: false,
        Colour: '',
        CardsDue: 0

    };
}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'cardStack' , resettable: true})
export class CardStackStore extends EntityStore<CardStackState> {

  constructor() {
    super(createInitialState());
  }
}
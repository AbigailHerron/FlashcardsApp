import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface CardItemState {
    CardID: number,
    DeckID: number,
    Front: string, 
    Hint: string,
    Back: string,
    ImageID?: string | undefined,
    ImageURL?: string | undefined,
}

export function createInitialState(): CardItemState {
    return {
        CardID: 0,
        DeckID: 0,
        Front: '',
        Hint: '',
        Back: '',
        ImageID: '',
        ImageURL: ''
    };
}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'cardItem' , resettable: true})
export class CardItemStore extends EntityStore<CardItemState> {

  constructor() {
    super(createInitialState());
  }
}
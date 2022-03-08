import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface SessionState {
    accessToken: string,
    UserName: string,
    UserEmail: string,
    UserID: number
}

export function createInitialState(): SessionState {
    return {
        accessToken: '',
        UserName: '',
        UserEmail: '',
        UserID: 0
    };
}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'session' })
export class SessionStore extends EntityStore<SessionState> {

  constructor() {
    super(createInitialState());
  }

  // login(session: SessionState) {
  //   this.update(session);
  //   //storage.saveSession(session);
  // }

  // logout() {
  //   //storage.clearSesssion();
  //   this.update(createInitialState());
  // }
}
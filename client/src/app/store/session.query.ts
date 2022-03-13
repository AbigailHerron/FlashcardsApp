import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

    name$ = this.getValue().UserName;
    
    // Observable
    userID$ = this.select((state) => state.UserID);

    // Value
    userId$ = this.getValue().UserID;

    // userDetails$ = this.select(['UserID','UserName','UserEmail','accessToken']);
    userDetails$ = this.getValue();

  constructor(protected store: SessionStore) {
    super(store);
  }
}
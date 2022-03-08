import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

    // Returns user details
    // userProps$ = this.select(['accessToken', 'userName', 'userEmail', 'userID']);

    name$ = this.getValue().userName;

  constructor(protected store: SessionStore) {
    super(store);
  }
}
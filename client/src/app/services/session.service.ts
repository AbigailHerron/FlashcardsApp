import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStore } from '../store/session.store';
import { Signup } from '../interfaces/signup';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { SessionQuery } from '../store/session.query';

@Injectable({ providedIn: 'root' })
export class SessionService {

  private url = ''; // 'http://localhost:3000/'; change to '' for Heroku deployment - applications will be deployed on the same domain

  constructor(private sessionStore: SessionStore, private http: HttpClient, private sessionQuery: SessionQuery) { }

    public get UserID() {

      return this.sessionQuery.userId$

    }

  // Login (post) a user
  public login(user: Login): Observable<User> {
    return this.http.post<any>(`${this.url}user/login`, user).pipe(
      tap((user) => {
        // Updating session state
        this.sessionStore.update(() => ({
          accessToken: user.accessToken,
          UserName: user.UserName,
          UserEmail: user.UserEmail,
          UserID: user.UserID,
        }));
      })
    );
  }

  // Signup (post) a user
  public signup(user: Login): Observable<User> {
    return this.http.post<any>(`${this.url}user/signup`, user).pipe(
      tap((user) => {
        // Updating session state
        this.sessionStore.update(() => ({
          UserName: user.UserName,
          UserEmail: user.UserEmail,
          UserID: user.UserID,
        }));
      })
    );
  }
}

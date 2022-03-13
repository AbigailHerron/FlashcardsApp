import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStore } from '../store/session.store';
import { Signup } from '../interfaces/signup';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore, private http: HttpClient) { }

    // RegisteR (post) a user
    public signup(user: Signup): Observable<any> {

        return this.http.post<any>('http://localhost:3000/user/signup', user)
        .pipe(tap(user => {

            // Updating session state
            this.sessionStore.update(() => ({
              accessToken: user.accessToken,
              UserName: user.UserName,
              UserEmail: user.UserEmail,
              UserID: user.UserID
            }));
        }))
      }
    
      // Login (post) a user
      public login(user: Login): Observable<User> {
    
        return this.http.post<any>('http://localhost:3000/user/login', user)
        .pipe(tap(user => {

          // Updating session state
          this.sessionStore.update(() => ({
            accessToken: user.accessToken,
            UserName: user.UserName,
            UserEmail: user.UserEmail,
            UserID: user.UserID
          }));    
      }))
    }
}
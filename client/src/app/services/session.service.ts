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

    // Register (post) a user

    public signup(user: Signup): Observable<any> {

        return this.http.post<any>('http://localhost:3000/user/signup', user)
        .pipe(tap(user => {

            this.sessionStore.update(state => ({
              accessToken: user.accessToken,
              userName: user.UserName,
              userEmail: user.UserEmail,
              userID: user.UserID
            }));
            
        }))
      }
    
      // Login (get) a user
    
      public login(user: Login): Observable<User> {
    
        return this.http.post<any>('http://localhost:3000/user/login', user)
        .pipe(tap(user => {

          this.sessionStore.update(state => ({
            accessToken: user.accessToken,
            userName: user.UserName,
            userEmail: user.UserEmail,
            userID: user.UserID
          }));
          
      }
        ))
    }
}
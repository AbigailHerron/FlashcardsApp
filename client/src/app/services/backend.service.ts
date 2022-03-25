import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { SessionStore } from '../store/session.store';
import { SessionQuery } from '../store/session.query';

@Injectable({ providedIn: 'root' })
export class BackendService {

  userID!: Number;

  private dataUri = 'http://localhost:3000/'; // change to '' for Heroku deployment - applications will be deployed on the same domain

  constructor(private http: HttpClient, private sessionStore: SessionStore, private session: SessionQuery) {

    this.userID = this.session.userId$;

  }


  // Get profile details

  getProfileDetails() : Observable<User> {

    console.log(this.userID);

    return this.http.get<User>(`${this.dataUri}user/profile/${this.userID}`)
    .pipe(map(user => {
      // localStorage.setItem('currentUser', JSON.stringify(user))
      // this.userSubject.next(user);
      return user;
    }
    ))
  }

  // Get all users

  getUsers(): Observable<Login[]> {

    console.log('Get user called');

    return this.http
      .get<Login[]>(`${this.dataUri}`)
      .pipe(catchError(this.handleError));
  }

  // Update username

  updateUserName(userName: string): Observable<User> {

    console.log('In updateUserName()');

    console.log(`${this.dataUri}user/profile/${this.userID}/username`);

    const data = { 'userName' : userName }

    console.log(data);

    return this.http.patch<User>(`${this.dataUri}user/profile/${this.userID}/username`, data)
      .pipe(tap(user => {
        // Updating session state
        this.sessionStore.update(() => ({
          UserName: user.UserName
        }));    
    }),
    catchError(this.handleError));
  }

  // Update email

  updateEmail(email: string) {

    console.log('In updateEmail()');

    const data = { 'email' : email}

    console.log(data);

    return this.http
      .patch<User>(`${this.dataUri}user/profile/${this.userID}/email`, data)
      .pipe(tap(user => {

        // Updating session state
        this.sessionStore.update(() => ({
          UserEmail: user.UserEmail
        }));
    }),
    catchError(this.handleError));

  }

  // Delete account

  deleteAccount() {

    console.log('In deleteAccount()');

    console.log(`${this.dataUri}user/profile/${this.userID}`);

    return this.http
      .delete<any>(`${this.dataUri}user/profile/${this.userID}`)
      .subscribe((res) => console.log(res));
  }

  // Error handling

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
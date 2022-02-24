import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Signup } from '../interfaces/signup';

@Injectable({ providedIn: 'root'})
export class BackendService {

  private dataUri = 'http://localhost:3000/user';
  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User|null>
    (JSON.parse(localStorage.getItem('currentUser') || '{}')) ;
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User|null {
    return this.userSubject.value;
  }

  // GET ALL USERS

  getUsers(): Observable<Login[]> {
    console.log('Get user called');

    return this.http
      .get<Login[]>(`${this.dataUri}`)
      .pipe(catchError(this.handleError));
  }

  // REGISTER (POST) A USER
  public signup(user: Signup): Observable<any> {

    return this.http.post<any>('http://localhost:3000/user/signup', user)
    .pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.userSubject.next(user);

      return user;
    }
    ))
  }

  // LOGIN (GET) A USER
  public login(user: Login): Observable<any> {

    return this.http.post<any>('http://localhost:3000/user/login', user)
    .pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.userSubject.next(user);

      return user;
    }
    ))
  }

  // ERROR HANDLING

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

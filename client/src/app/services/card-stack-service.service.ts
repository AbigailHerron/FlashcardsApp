import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';

import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpEvent, HttpBackend } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { BackendService } from './backend.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CardStackServiceService {

  constructor(private http: HttpClient) { }

  private dataUri = 'http://localhost:3000/user/decks'

  getCardStacks(): Observable<IcardStack[]>{

    console.log("Get card service called");

    return this.http.get<IcardStack[]>(this.dataUri)
    .pipe(
      catchError(this.handleError)
    )
  }

  //____________________ addCardToStackMethod post http://localhost:3000/user/decks req.body

  addCardToStack(cardStackDetails : IcardStack): Observable<IcardStack>{
    console.log("Post cardStack service called");

    return this.http.post<IcardStack>(this.dataUri, JSON.stringify(cardStackDetails))
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

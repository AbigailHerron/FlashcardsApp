import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';

import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpEvent, HttpBackend } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { User } from '../interfaces/user';
import { Icard } from '../interfaces/icard';

@Injectable({
  providedIn: 'root',
})
export class CardStackServiceService {

  constructor(
    private http: HttpClient,
    private backEndService: BackendService
  ) {}

  // Example userID, normally we would get this once the user logs in
    //private userID = sessionStorage.getItem("UserID");

    private user = this.backEndService.userValue;
    private userID = this.user?.UserID;

  // Example use of request parameters
  private deckUri = `http://localhost:3000/user/${this.userID}/decks`;

  currentCardStack!: IcardStack;

  private cardStackSource = new BehaviorSubject<IcardStack>(this.currentCardStack)

  stackSelected = this.cardStackSource.asObservable();

  changeStack(stack: IcardStack) {
    this.cardStackSource.next(stack)
  }

  public get deckValue(): User|null {
    return this..value;
  }

  // private dataUri = 'http://localhost:3000/user/decks'

  getCardStacks(): Observable<IcardStack[]>{

    console.log("Get card service called");

    console.log(this.userID);

    return this.http.get<IcardStack[]>(this.deckUri)
    .pipe(
      catchError(this.handleError)
    )
  }

  getCardsFromStack(): Observable<Icard[]> {

    console.log('Get cardsFromStack called')

    console.log(this.stackSelected._subscribe());

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/cards`;

    return this.http.get<Icard[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  //____________________ addCardToStackMethod post http://localhost:3000/user/decks req.body

  addCardToStack(cardStackDetails: IcardStack): Observable<IcardStack> {
    console.log('Post cardStack service called');

    return this.http
      .post<IcardStack>(this.deckUri, JSON.stringify(cardStackDetails))
      .pipe(catchError(this.handleError));
  }

  // DELETE CARD STACK

  deleteCardStack(cardStackDetails: IcardStack)
  {
  console.log("delete card stack called!");

    const url = `http://localhost:3000/user/${this.userID}/deck/${cardStackDetails.DeckID}`;

    console.log(url);

    this.http.delete(url).subscribe(() => console.log('deleted'));
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
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}

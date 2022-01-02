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
  ) {
  }
  // Example userID, normally we would get this once the user logs in
  //private userID = sessionStorage.getItem("UserID");
    private user = this.backEndService.userValue;
    private userID = this.user?.UserID;

  // Example use of request parameters
  private deckUri = `http://localhost:3000/user/${this.userID}/decks`;

  currentCardStack!: IcardStack;

  private cardStackSource = new BehaviorSubject<IcardStack>(this.currentCardStack)

  stackID = this.cardStackSource.value;

  // We need to be able to retrieve a specific cards details
  
  changeStack(stack: IcardStack) {
    this.cardStackSource.next(stack)
  }

  public deckValue(cardStack: IcardStack) {
    this.cardStackSource.next(cardStack);
  }

  public get deckDetails() {
    return this.cardStackSource.value;
  }

  // private dataUri = 'http://localhost:3000/user/decks'



  //____________________ addCardToStackMethod post http://localhost:3000/user/decks req.body

  // ADD CARD TO STACK

  // addBlankCardToStack() : Observable<Icard> {

  //   console.log('Post cardStack service called');

  //   const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/cards`;

  //   const data = { Front: 'Front', Back: 'Back'}

  //   console.log(JSON.stringify(data));
  //   console.log(url);

  //   return this.http.post<Icard>(url, JSON.stringify(data)).pipe(catchError(this.handleError));

  // }

  getCardsFromStack(): Observable<Icard[]> {

    console.log('Get cardsFromStack called');

    console.log(this.cardStackSource.value.DeckID);

    //const stackID = stack.toString();

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/cards`;

    return this.http.get<Icard[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  addBlankCardToStack() {

    console.log('Post cardStack service called');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/cards`;

    const data = { Front: '', Back: '' };

    console.log(JSON.stringify(data));
    console.log(url);

    this.http
      .post<Icard>(url, JSON.stringify(data))
      .subscribe(() => console.log('added'));
  }

  // DELETE A CARD FROM THE STACK

  deleteCardFromStack(card: Icard) {

    console.log('deleteCardFromStack called');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/card/${card.CardID}`;

    this.http.delete(url).subscribe(() => console.log('Card deleted'));

  }

  //____________________________________________________________________________________________________ CRUD OPERATIONS FOR CARDSTACKS
  
  // CREATE CARDSTACK

  addCardToStack(cardStackDetails: IcardStack): Observable<IcardStack> {

    console.log('Post cardStack service called');

    const url = `http://localhost:3000/user/${this.userID}/decks`;

    return this.http
      .post<IcardStack>(url, JSON.stringify(cardStackDetails))
      .pipe(catchError(this.handleError));
  }

  // READ CARDSTACKS

  getCardStacks(): Observable<IcardStack[]>{

    console.log("Get card service called");

    return this.http.get<IcardStack[]>(this.deckUri)
    .pipe(
      catchError(this.handleError)
    )
  }

  // UPDATE CARDSTACK

  updateCardStack(cardStackDetails: IcardStack, cardStackID: number): Observable<IcardStack> {
    
    const url = `http://localhost:3000/user/${this.userID}/deck/${cardStackID}`;

    console.log("updateCardStack called");

    return this.http.patch<IcardStack>(url, cardStackDetails)
    .pipe(
      catchError(this.handleError)
    )
  }

  // DELETE CARDSTACK

  deleteCardStack(cardStackDetails: IcardStack)
  {
  console.log("deleteCardStack called");

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

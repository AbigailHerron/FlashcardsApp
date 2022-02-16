import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';
import { Istacksettings } from '../interfaces/istacksettings';

import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpEvent, HttpBackend } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { Icard } from '../interfaces/icard';

@Injectable({
  providedIn: 'root',
})
export class CardStackServiceService {

  // Retrieving user, then userID
  private user = this.backEndService.userValue;
  private userID = this.user?.UserID;

  // Example use of request parameters
  private deckUri = `http://localhost:3000/user/${this.userID}/decks`;

  currentCardStack!: IcardStack;
  public cardStackSource = new BehaviorSubject<IcardStack>(this.currentCardStack)
  stackID = this.cardStackSource.value;

  selectedCardStackOptions!: Istacksettings;
  public cardStackOptionsSource = new BehaviorSubject<Istacksettings>(this.selectedCardStackOptions);

  constructor(private http: HttpClient, private backEndService: BackendService) { }

  changeStack(stack: IcardStack) {
    this.cardStackSource.next(stack)
  }

  // SETTING A CARD STACK AS THE CURRENT CARD STACK
  public deckValue(cardStack: IcardStack) {
    this.cardStackSource.next(cardStack);
  }

  // RETRIEVING CURRENT CARD STACK

  public get deckDetails() {
    return this.cardStackSource.value;
  }

  //____________________________________________________________________________________________________ STORE AND RETRIEVE CARDSTACKMENU OPTIONS

  // Setting card stack options
  public deckOptions(stackOptions: Istacksettings) {
    this.cardStackOptionsSource.next(stackOptions);
  }

  // Retrieving selected options
  public get deckOptionsDetails() {
    return this.cardStackOptionsSource.value;
  }

  //____________________________________________________________________________________________________ CRUD OPERATIONS FOR CARDS IN A STACK

  // CREATE CARDS IN STACK

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

  // Get all cards from a stack

  getAllCardsFromStack(): Observable<Icard[]> {

    this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/all`;

    return this.http.get<Icard[]>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }

  // Get due cards from a stack

  getCardsFromStack(): Observable<Icard[]> {

    this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}');

    //this.currentCardStack = this.deckDetails;

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/cards`;

    return this.http.get<Icard[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  // UPDATE A CARD FROM THE STACK

  updateCardFromStack(cardID: number, card: Icard) : Observable<Icard> {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/card/${cardID}`;

    return this.http.patch<Icard>(url, card)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Setting a card to easy

  setCardToEasy(card: Icard) {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/card/${card.CardID}/easy`;

    return this.http.patch<any>(url, card)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Setting a card to hard

  setCardToHard(card: Icard) {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/card/${card.CardID}/hard`;

    return this.http.patch<any>(url, card)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
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

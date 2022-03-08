import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';
import { Istacksettings } from '../interfaces/istacksettings';

import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpEvent, HttpBackend } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { Icard } from '../interfaces/icard';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root',
})
export class CardStackServiceService {

  // Retrieving user, then userID
  private userID! : number;

  currentCardStack!: IcardStack;
  public cardStackSource = new BehaviorSubject<IcardStack>(this.currentCardStack);
  stackID = this.cardStackSource.value;

  selectedCardStackOptions!: Istacksettings;
  public cardStackOptionsSource = new BehaviorSubject<Istacksettings>(
    this.selectedCardStackOptions
  );

  constructor(private http: HttpClient, private session: SessionQuery) {
    this.userID = this.session.userID$;
   }

  // Example use of request paramZZZeters
  private deckUri = `http://localhost:3000/user/${this.userID}/decks`;

  changeStack(stack: IcardStack) {
    this.cardStackSource.next(stack);
  }

  // Setting cardstack as current cardstack

  public deckValue(cardStack: IcardStack) {
    this.cardStackSource.next(cardStack);
  }

  // Retrieve current card stack

  public get deckDetails() {
    return this.cardStackSource.value;
  }

  //____________________________________________________________________________________________________ Store and retrieve card stack menu details

  // Setting card stack options
  public deckOptions(stackOptions: Istacksettings) {
    this.cardStackOptionsSource.next(stackOptions);
  }

  // Retrieving selected options
  public get deckOptionsDetails() {
    return this.cardStackOptionsSource.value;
  }

  //____________________________________________________________________________________________________ CRUD operations for cards within stack

  // Add blank card to stack

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

    return this.http
      .get<Icard[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get due cards from a stack

  getCardsFromStack(): Observable<Icard[]> {
    this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}');

    //this.currentCardStack = this.deckDetails;

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/cards`;

    return this.http.get<Icard[]>(url).pipe(catchError(this.handleError));
  }

  // Update card in stack

  updateCardFromStack(cardID: number, card: Icard): Observable<Icard> {
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${cardID}`;

    return this.http
      .put<Icard>(url, card, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Upload image to card

  uploadImage(formData: FormData, cardID: number) {
    const url = 'http://localhost:3000/image/upload';
    return this.http
      .post<any>(url, formData)
      .subscribe((res) => this.updateCardImage(res, cardID));
  }

  // Delete image from card

  deleteImage() {
    //const url = 'http://localhost:3000/image/delete/${this.publicID}'
  }

  // Update card image

  updateCardImage(imageDetails: Icard, cardID: number): Observable<Icard> {
    /*     return this.http
      .patch<any>(url, imageDetails)
      .pipe(retry(1), catchError(this.handleError)); */

    // Can't make this http call
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${cardID}`;

    return this.http
      .patch<Icard>(url, imageDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(retry(1), catchError(this.handleError));

      // ########## Important

      // The card controller is returning a json response
      // res.json({ public_id: result.public_id, url: result.secure_url });

      // We arent able to parse this correctly
  }

  // Setting card difficulty to easy

  setCardToEasy(card: Icard) {
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${card.CardID}/easy`;

    return this.http
      .patch<any>(url, card)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Setting card difficulty to hard

  setCardToHard(card: Icard) {
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${card.CardID}/hard`;

    return this.http.patch<any>(url, card)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Delete card from stack

  deleteCardFromStack(card: Icard) {

    console.log('deleteCardFromStack called');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.cardStackSource.value.DeckID}/card/${card.CardID}`;

    this.http.delete(url).subscribe(() => console.log('Card deleted'));
  }

  //____________________________________________________________________________________________________ CRUD operations for card stacks

  // Create cardstack

  addCardToStack(cardStackDetails: IcardStack): Observable<IcardStack> {

    console.log('Post cardStack service called');

    const url = `http://localhost:3000/user/${this.userID}/decks`;

    return this.http.post<IcardStack>(url, JSON.stringify(cardStackDetails))
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get cardstacks

  getCardStacks(): Observable<IcardStack[]> {

    console.log('Get card service called');

    console.log(this.userID);

    const url = `http://localhost:3000/user/${this.userID}/decks`

    console.log(url);

    return this.http.get<IcardStack[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get public cardstacks

  getPublicCardStacks(): Observable<IcardStack[]> {
    console.log('Get card service called');

    return this.http.get<IcardStack[]>('http://localhost:3000/publicDecks')
    .pipe(
      catchError(this.handleError)
    );

  }


  // Update cardstack

  updateCardStack(cardStackDetails: IcardStack, cardStackID: number): Observable<IcardStack> {

    const url = `http://localhost:3000/user/${this.userID}/deck/${cardStackID}`;

    console.log('card-stack-service method: updateCardStack called');

    return this.http.put<IcardStack>(url, cardStackDetails)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Delete cardstack

  deleteCardStack(cardStackDetails: IcardStack) {
    console.log('deleteCardStack called');

    const url = `http://localhost:3000/user/${this.userID}/deck/${cardStackDetails.DeckID}`;

    console.log(url);

    this.http.delete(url).subscribe(() => console.log('deleted'));
  }

  //____________________________________________________________________________________________________ Error handling

  // Error handling

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

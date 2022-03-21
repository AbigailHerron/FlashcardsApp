import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';
import { Istacksettings } from '../interfaces/istacksettings';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpBackend,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map, tap, mapTo } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { Icard } from '../interfaces/icard';
import { SessionQuery } from '../store/session.query';
import { CardStackQuery } from '../store/card-stack.query';
import { CardStackStore } from '../store/card-stack.store';


@Injectable({
  providedIn: 'root',
})
export class CardStackServiceService {

  private httpSkipInterceptor: HttpClient;

  private userID!: number;

  currentCardStack$!: IcardStack;
  currentStackID$!: number;


  selectedCardStackOptions!: Istacksettings;
  public cardStackOptionsSource = new BehaviorSubject<Istacksettings>(
    this.selectedCardStackOptions
  );

  private imageID?: string;

  constructor(private http: HttpClient,    private handler: HttpBackend,    private session: SessionQuery,    private cardStackQuery: CardStackQuery, private cardStackStore: CardStackStore) {

    this.userID = this.session.userId$;

    // this.cardStackQuery.currentStackState$.pipe(mapTo(this.currentCardStack$));

    this.cardStackQuery.currentStack$.subscribe(res => this.currentCardStack$ = res)

    this.cardStackQuery.cardStackID$.subscribe(res => this.currentStackID$ = res);

    this.httpSkipInterceptor = new HttpClient(handler);
  }

  changeStack(stack: IcardStack) {

    this.cardStackStore.update(stack);

  }

  // Setting cardstack as current cardstack
  public deckValue(cardStack: IcardStack) {

    console.log("Updating CardStackStore value")

    this.cardStackStore.update(cardStack);

    console.log("Current CardStackStore value")
     this.cardStackQuery.currentStack$.subscribe(res => console.log(res));

    // this.cardStackSource.next(cardStack);
  }

  // Retrieve current card stack

  public get deckDetails() {

    // Returning state ( Observable )
    return this.cardStackQuery.currentStack$

    // return this.cardStackSource.value;

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

    console.log('addBlankCardToStack function called | card-stack-service.service.ts');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/cards`;

    const data = { Front: '', Back: '' };

    console.log(JSON.stringify(data));
    console.log(url);

    this.http
      .post<Icard>(url, JSON.stringify(data))
      .subscribe(() => console.log('added'));
  }

  // Get all cards from a stack

  getAllCardsFromStack(): Observable<Icard[]> {

    // this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/all`;

    console.log(this.currentCardStack$);

    return this.http
      .get<Icard[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get due cards from a stack

  getCardsFromStack(): Observable<Icard[]> {

    console.log('Curent card stack is ' + this.currentStackID$);

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/cards`;

    console.log(url);

    return this.http.get<Icard[]>(url).pipe(catchError(this.handleError));
  }

  // Update card in stack

  updateCardFromStack(cardID: number, card: Icard) {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/card/${cardID}`;

    console.log(url);

    return this.http
      .patch<Icard>(url, card, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe((res) => console.log(res));
  }

  // Upload image to card

  uploadImage(formData: FormData, cardID: number) {
    const url = 'http://localhost:3000/image/upload';

    return this.httpSkipInterceptor
      .post<any>(url, formData)
      .subscribe((res) => this.updateCardImage(res, cardID));


  }

  // Delete image from card

  deleteImage(cardID: number, imageURL: string | undefined) {

    console.log('In deleteImage()')

    console.log('Current card ID : ' + cardID);

    console.log('Image URL : ' + imageURL);

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/card/${cardID}/image/testing/${imageURL}`;

    console.log(url);

    // const deckID = this.currentStackID$;

    this.http.delete<any>(url).subscribe((res) => console.log(res));
  }

  // Update card image

  updateCardImage(imageDetails: any, cardID: number) {

    console.log(imageDetails);

    console.log('Image ID : ' + imageDetails['imageID']);

    this.imageID = imageDetails['imageID'];

    // console.log(`${this.userID},${this.currentStackID$},${cardID}`);

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/card/${cardID}/update-image`;

    this.http.patch<any>(url, imageDetails).subscribe((res) => console.log(res));
  }

  // Setting card difficulty to easy

  setCardToEasy(card: Icard) {
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/card/${card.CardID}/easy`;

    return this.http.patch<any>(url, card).subscribe((res) => console.log(res));
  }

  // Setting card difficulty to hard

  setCardToHard(card: Icard) {
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/card/${card.CardID}/hard`;

    return this.http
      .patch<any>(url, card)
      .subscribe((res) => console.log(res));
  }

  // Delete card from stack

  deleteCardFromStack(card: Icard) {
    
    console.log('deleteCardFromStack called');

    // if (card.ImageID === null) {
    //   this.imageID = 'testing/null';
    // }

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}/card/${card.CardID}`;

    this.http.delete<any>(url).subscribe(() => console.log('Card deleted'));
  }

  //____________________________________________________________________________________________________ CRUD operations for card stacks

  // Create cardstack

  addCardToStack(cardStackDetails: IcardStack): Observable<IcardStack> {
    console.log('addCardStack service function called');

    console.log(cardStackDetails);

    const url = `http://localhost:3000/user/${this.userID}/decks`;

    return this.http
      .post<IcardStack>(url, cardStackDetails)
      .pipe(catchError(this.handleError));
  }

  // Get cardstacks

  getCardStacks(): Observable<IcardStack[]> {
    console.log('Get card service called');

    console.log(this.userID);

    const url = `http://localhost:3000/user/${this.userID}/decks`;

    console.log(url);

    return this.http.get<IcardStack[]>(url).pipe(catchError(this.handleError));
  }

  // Get public cardstacks

  getPublicCardStacks(): Observable<IcardStack[]> {
    console.log('Get card service called');

    return this.http
      .get<IcardStack[]>('http://localhost:3000/publicDecks')
      .pipe(catchError(this.handleError));
  }

  // Update cardstack

  updateCardStack(cardStackDetails: IcardStack, cardStackID: number) {
    const url = `http://localhost:3000/user/${this.userID}/deck/${cardStackID}`;

    console.log('card-stack-service method: updateCardStack called');
    console.log(cardStackDetails);
    return this.http.put<IcardStack>(url, cardStackDetails).subscribe(() => console.log('Updated'));
  }

  // Delete cardstack

  deleteCardStack(cardStackDetails: IcardStack) {

    console.log('deleteCardStack() | card-stack-service.service.ts');

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentStackID$}`;

    console.log('Current url : ' + url);

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

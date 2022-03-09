import { Injectable } from '@angular/core';
import { IcardStack } from '../interfaces/icard-stack';
import { Istacksettings } from '../interfaces/istacksettings';

<<<<<<< HEAD
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpEvent, HttpBackend } from '@angular/common/http';
=======
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
>>>>>>> 08b1042 (images fully working)
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { Icard } from '../interfaces/icard';

@Injectable({
  providedIn: 'root',
})
export class CardStackServiceService {
  // Retrieving user, then userID
<<<<<<< HEAD
  private user = this.backEndService.userValue;
  private userID = this.user?.UserID;

  // Example use of request parameters
  private deckUri = `http://localhost:3000/user/${this.userID}/decks`;

  currentCardStack!: IcardStack;
  public cardStackSource = new BehaviorSubject<IcardStack>(this.currentCardStack)
=======
  private userID!: number;
  private httpSkipInterceptor: HttpClient;

  currentCardStack!: IcardStack;
  public cardStackSource = new BehaviorSubject<IcardStack>(
    this.currentCardStack
  );
>>>>>>> 08b1042 (images fully working)
  stackID = this.cardStackSource.value;

  selectedCardStackOptions!: Istacksettings;
  public cardStackOptionsSource = new BehaviorSubject<Istacksettings>(this.selectedCardStackOptions);

<<<<<<< HEAD
  constructor(private http: HttpClient, private backEndService: BackendService) { }
=======
  constructor(
    private handler: HttpBackend,
    private http: HttpClient,
    private session: SessionQuery
  ) {
    this.userID = this.session.userID$;
    this.httpSkipInterceptor = new HttpClient(handler);
  }

  // Example use of request paramZZZeters
  private deckUri = `http://localhost:3000/user/${this.userID}/decks`;
>>>>>>> 08b1042 (images fully working)

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

<<<<<<< HEAD
    return this.http.get<Icard[]>(url)
    .pipe(
      catchError(this.handleError)
    )
=======
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
    return this.httpSkipInterceptor
      .post<any>(url, formData)
      .subscribe((res) => this.updateCardImage(res, cardID));
  }

  // Delete image from card

  deleteImage(imageID: any, cardID: any) {
    const url = 'http://localhost:3000/image/delete';
    const deckID = this.currentCardStack.DeckID;
    this.http
      .post<any>(url, { imageID, deckID, cardID })
      .subscribe((res) => console.log(res));
>>>>>>> 08b1042 (images fully working)
  }

  // UPDATE A CARD FROM THE STACK

<<<<<<< HEAD
  updateCardFromStack(cardID: number, card: Icard) : Observable<Icard> {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${cardID}`;

    return this.http.put<Icard>(url, card,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
=======
  updateCardImage(imageDetails: Icard, cardID: number) {
    /*     return this.http
      .patch<any>(url, imageDetails)
      .pipe(retry(1), catchError(this.handleError)); */
    console.log(imageDetails);
    console.log(`${this.userID},${this.currentCardStack.DeckID},${cardID}`);
    // Can't make this http call
    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${cardID}/update-image`;
    this.http
      .patch<any>(url, imageDetails)
      .subscribe((res) => console.log(res));
>>>>>>> 08b1042 (images fully working)
  }

  // Setting a card to easy

  setCardToEasy(card: Icard) {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${card.CardID}/easy`;

    return this.http.patch<any>(url, card)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Setting a card to hard

  setCardToHard(card: Icard) {

    const url = `http://localhost:3000/user/${this.userID}/deck/${this.currentCardStack.DeckID}/card/${card.CardID}/hard`;

<<<<<<< HEAD
    return this.http.patch<any>(url, card)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
=======
    return this.http
      .patch<any>(url, card)
      .pipe(retry(1), catchError(this.handleError));
>>>>>>> 08b1042 (images fully working)
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

<<<<<<< HEAD
  // READ CARDSTACKS
=======
  // Get cardstacks

  getCardStacks(): Observable<IcardStack[]> {
    console.log('Get card service called');
>>>>>>> 08b1042 (images fully working)

  getCardStacks(): Observable<IcardStack[]>{

<<<<<<< HEAD
    console.log("Get card service called");

    return this.http.get<IcardStack[]>(this.deckUri)
    .pipe(
      catchError(this.handleError)
    )
  }

  // UPDATE CARDSTACK

  updateCardStack(cardStackDetails: IcardStack, cardStackID: number): Observable<IcardStack> {
    
=======
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

  updateCardStack(
    cardStackDetails: IcardStack,
    cardStackID: number
  ): Observable<IcardStack> {
>>>>>>> 08b1042 (images fully working)
    const url = `http://localhost:3000/user/${this.userID}/deck/${cardStackID}`;

    console.log("updateCardStack called");

<<<<<<< HEAD
    return this.http.patch<IcardStack>(url, cardStackDetails)
    .pipe(
      catchError(this.handleError)
    )
=======
    return this.http
      .put<IcardStack>(url, cardStackDetails)
      .pipe(retry(1), catchError(this.handleError));
>>>>>>> 08b1042 (images fully working)
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

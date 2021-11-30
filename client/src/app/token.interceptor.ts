import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // if (request.url.search(re) === -1 ) 
    // {
      const newRequest = request.clone({ body: { "userID" : 25 } }); // APPENDING USER ID TO REQ BODY OF ALL REQUESTS
      return next.handle(newRequest);
    // }
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } 
from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root'})
export class JwtinterceptorService implements HttpInterceptor{

  constructor(private backEndService : BackendService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const user = this.backEndService.userValue;

    const accessToken = user?.accessToken;
    const userID = user?.UserID;

    const isApiUrl = request.url.startsWith(environment.apiUrl);

    console.log(user?.UserID);

    console.log(isApiUrl);

    console.log(accessToken);

     if (accessToken && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
        params: request.params.set("UserID", `${userID}`)
      });        
     }
     
    return next.handle(request);
  }
}

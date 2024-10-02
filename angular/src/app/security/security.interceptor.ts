import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {SecurityService} from "./service/security.service";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {


  constructor(
    private securityService: SecurityService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.securityService.isValid()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.securityService.credential.accessToken}`
        }
      });
    }
    return next.handle(request).pipe(catchError((response: HttpErrorResponse): Observable<HttpEvent<any>> => {

      if (response.status === 401) {
        console.log("401", response);
        this.securityService.onUnauthorized.emit(this.securityService.credential);
      }

      if (response.status === 403) {
        console.log("403", response);
        this.securityService.onForbidden.emit(this.securityService.credential);
      }
      return throwError(response);
    }));
  }
}

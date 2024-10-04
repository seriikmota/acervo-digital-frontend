
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() { }

      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((response: HttpErrorResponse): Observable<HttpEvent<any>> => {
            console.log('intercept', response);

            return throwError("");
        }));
    }
}

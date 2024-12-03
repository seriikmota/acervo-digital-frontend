import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Message, MessageResponse} from "./message/message.service";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((response: HttpErrorResponse): Observable<HttpEvent<Message>> => {
      const messageReponse = Object.assign(new MessageResponse(), response.error);

      this.errorService.handleGlobalError(messageReponse);

      return throwError(messageReponse);
    }));
  }
}

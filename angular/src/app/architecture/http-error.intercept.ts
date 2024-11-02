import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Message} from "./message/message.service";
import {ErrorService} from "./error.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((response: HttpErrorResponse): Observable<HttpEvent<Message>> => {
      console.log('intercept-error', response);
      const messageTO = Object.assign(new Message(), response.error);

      if (messageTO.status === 401 || messageTO.status === 403) {
        delete messageTO.message;
      }

      // Tratamento de erros global
      this.errorService.handleGlobalError(messageTO);

      return throwError(messageTO);
    }));
  }
}

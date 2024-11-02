import {Injectable} from '@angular/core';
import {Message, MessageService} from "./message/message.service";
import {Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _handleLocalError = false;

  constructor(private messageService: MessageService) { }

  public handleLocalError(){
    this._handleLocalError = true;
  }

  handleGlobalError(error: Message): void {
    if(!this._handleLocalError){
      console.error('Global Error Handler:', error);
      this._handleLocalError = false;
      // Mostrar uma mensagem de erro global
      this.messageService.addMsgWarning(error);
    } else {
      this._handleLocalError = false;
      console.info('Global error handler ignored!');
    }
  }
}

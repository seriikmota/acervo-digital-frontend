import {Injectable} from '@angular/core';
import {Message, MessageResponse} from "./message/message.service";
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _handleLocalError = false;

  constructor(private notificationsService: NotificationsService) { }

  public handleLocalError(){
    this._handleLocalError = true;
  }

  handleGlobalError(messageResponse: MessageResponse): void {
    if(!this._handleLocalError){
      this._handleLocalError = false;
      for (let message of messageResponse.messages) {
        if (message.type === Message.ALERT_TYPE_INFO) {
          this.notificationsService.info(message.message)
        }
        else if (message.type === Message.ALERT_TYPE_WARNING) {
          this.notificationsService.warn(message.message)
        }
        else if (message.type === Message.ALERT_TYPE_ERROR) {
          this.notificationsService.error(message.message)
        }
        else if (message.type === Message.ALERT_TYPE_SUCCESS) {
          this.notificationsService.success(message.message)
        } else {
          this.notificationsService.error(message.message)
        }
      }
    } else {
      this._handleLocalError = false;
    }
  }
}

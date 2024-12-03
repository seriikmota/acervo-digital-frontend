import {EventEmitter, Injectable} from '@angular/core';
import {CrudAction} from "./curd-action";

@Injectable({
  providedIn: 'root'
})
export class CrudActionService {
  constructor() { }
  public onListChange: EventEmitter<CrudAction> = new EventEmitter<CrudAction>();
}

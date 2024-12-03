import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public onStart: EventEmitter<void>;
  public onStop: EventEmitter<void>;

  /**
   * Construtor da classe.
   */
  constructor() {
    this.onStart = new EventEmitter<void>();
    this.onStop = new EventEmitter<void>();
  }
}

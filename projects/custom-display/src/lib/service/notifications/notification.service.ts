import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {

  }

  private _successMessage: Subject<string> = new Subject<string>();

  get successMessage(): Subject<string> {
    return this._successMessage;
  }

  private _errorMessage: Subject<string> = new Subject<string>();

  get errorMessage(): Subject<string> {
    return this._errorMessage;
  }

  newMessage(message: string): void {
    this._successMessage.next(message);
  }

  newError(message: string): void {
    this._errorMessage.next(message);
  }


}

import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {
  }

  private _successMessage: Subject<string> = new Subject<string>();

  get successMessage(): Subject<string> {
    return this._successMessage;
  }

  private _errorMessage: Subject<string> = new Subject<string>();

  get errorMessage(): Subject<string> {
    return this._errorMessage;
  }

  newMessage(message: string, snack: boolean = false): void {
    if(snack) {
      this._snackBar.open(message, 'Fermer', {duration: 5000})
    }
    this._successMessage.next(message);
  }

  newError(message: string, snack: boolean = false): void {
    if(snack) {
      this._snackBar.open(message, 'Fermer', {
        duration: 60 * 1000,
        panelClass: 'error'
      })
    }
    this._errorMessage.next(message);
  }
}

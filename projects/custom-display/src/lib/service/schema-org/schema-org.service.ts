import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SchemaOrgService {
  private _text: Subject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.resetText();
      }
    });
  }

  setText(value: string) {
    this._text.next(value);
  }

  get text$(): Subject<string> {
    return this._text;
  }

  private resetText(): void {
    this._text.next('');
  }
}

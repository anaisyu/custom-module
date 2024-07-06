import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SchemaOrgService {
  private _text: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.resetText();
      }
    });
  }

  get text(): string {
    return this._text.value;
  }

  set text(value: string) {
    this._text.next(value);
  }

  get text$(): Observable<string> {
    return this._text.asObservable();
  }

  private resetText(): void {
    this._text.next('');
  }
}

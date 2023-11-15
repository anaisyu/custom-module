import {Inject, Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private title: Title,
    @Inject('siteTitleBase') private siteTitleBase: string
  ) {

  }

  public setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }

  public appendToTitle(newTitle: string): void {
    this.setTitle(this.title.getTitle() + ' | ' + newTitle);
  }

  public appendToBaseTitle(newTitle: string): void {
    this.setTitle(this.siteTitleBase + ' | ' + newTitle);
  }
}

import {Inject, Injectable} from "@angular/core";
import {RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Injectable()
export class MyTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, @Inject('siteTitleBase') private siteTitleBase: string) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      if (title.length > 0) {
        this.title.setTitle(`${this.siteTitleBase} | ${title}`);
      } else {
        this.title.setTitle(this.siteTitleBase);
      }
    }
  }
}

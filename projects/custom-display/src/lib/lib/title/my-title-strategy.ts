import {Inject, Injectable} from "@angular/core";
import {RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class MyTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private translate: TranslateService, @Inject('siteTitleBase') private siteTitleBase: string) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      if (title.length > 0) {
        this.translate.stream(title).subscribe(res => {
          this.title.setTitle(`${res} - ${this.siteTitleBase}`);
        })
      } else {
        this.title.setTitle(this.siteTitleBase);
      }
    }
  }
}

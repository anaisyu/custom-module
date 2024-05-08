import {Inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {NotificationService} from "../notifications/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@Injectable({
  providedIn: 'root'
})
export class TranslationClientService {
  public changes: Object = {};
  public editSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public static readonly COOKIE_NAME = "site-text"

  constructor(
    private service: TranslateService,
    private notificationService: NotificationService,
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject('backendUrl') private backendUrl: string,
    ) {
    // Retrieve object from the cookie
    const objFromCookie = this.cookieService.get(TranslationClientService.COOKIE_NAME);
    if (objFromCookie) {
      this.changes = JSON.parse(objFromCookie)
    } else {
      this.changes = {}
    }

  }

  public static merge(left: any, right: any) {
    if (typeof left !== 'object') {
      return right;
    }
    let res = Object.assign({}, left);
    for (const key of Object.keys(right)) {
      if (left[key]) {
        res[key] = this.merge(left[key], right[key])
      } else {
        res[key] = right[key]
      }
    }
    return res;
  }

  next(key: string, data: string) {
    console.log('save key ' + key + ' with data ' + data)
    let set: any = this.changes;

    const keys: string[] = key.split('.')
    for (let i = 0; i < keys.length - 1; i++) {
      if (!set[keys[i]]) {
        set[keys[i]] = {}
      }
      set = set[keys[i]]
    }
    if (!set[keys[keys.length - 1]]) {
      set[keys[keys.length - 1]] = {}
    }
    set[keys[keys.length - 1]] = data;

    this.saveCookie();
  }

  save(lang: string = 'fr') {
    const loader = new TranslateHttpLoader(this.http, this.backendUrl + '/assets/get/')
    loader.getTranslation(lang).subscribe(original => {
      this.http.post(this.backendUrl + '/assets/save-new/' + lang,
        TranslationClientService.merge(original, this.changes)
      ).subscribe({
        next: response => {
          this.notificationService.newMessage('Vos modifications ont bien été sauvegardées.');
          this.cookieService.delete(TranslationClientService.COOKIE_NAME)
        }, error: (msg) => {
          console.error(msg)
          this.notificationService.newError('Echec lors de la sauvegarde. Merci de réessayer.')
        }
      })
    })
  }

  cancel() {
    this.cookieService.delete(TranslationClientService.COOKIE_NAME)
    this.refresh();
  }

  private refresh() {
    window.location.href = window.location.toString()
  }

  saveCookie(minutesExpire: number = 60) {
    if (!this.changes || Object.keys(this.changes).length == 0) {
      return
    }
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + minutesExpire)
    console.log('save')
    console.log(JSON.stringify(this.changes))
    this.cookieService.set(TranslationClientService.COOKIE_NAME,
      JSON.stringify(this.changes),
      {expires: date})
  }

  streamTranslation(key: string): Observable<string> {
    let set: any = this.changes;

    const keys: string[] = key.split('.')
    for (let i = 0; i < keys.length - 1; i++) {
      if (!set[keys[i]]) {
        return this.service.stream(key)
      }
      set = set[keys[i]]
    }
    if (set[keys[keys.length - 1]]) {
      return of(set[keys[keys.length - 1]])
    }

    return this.service.stream(key);
  }

  sync(lang: string = 'fr') {
      this.http.post(this.backendUrl + '/assets/sync/' + lang, {}).subscribe({
      next: response => {
        this.notificationService.newMessage('Synced');
      }, error: (msg) => {
        console.error(msg)
        this.notificationService.newError('Sync failed')
      }
    })
  }
}

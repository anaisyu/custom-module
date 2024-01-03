import {Inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {NotificationService} from "../notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class TranslationClientService {
  public static changes: Object = {};
  public editSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly COOKIE_NAME = "site-text"

  constructor(private service: TranslateService, private notificationService: NotificationService, private http: HttpClient, private cookieService: CookieService, @Inject('backendUrl') private backendUrl: string) {
    // Retrieve object from the cookie
    const objFromCookie = this.cookieService.get(this.COOKIE_NAME);
    if (objFromCookie) {
      TranslationClientService.changes = JSON.parse(objFromCookie)
    } else {
      TranslationClientService.changes = {}
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
    let set: any = TranslationClientService.changes;

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
    this.service.getTranslation(lang).subscribe(original => {
      this.http.post(this.backendUrl + '/assets/save/' + lang,
        TranslationClientService.merge(original, TranslationClientService.changes)
      ).subscribe({
        next: response => {
          this.notificationService.newMessage('Sauvegardé. Veuillez attendre quelques minutes pour que la propagation soit complète.');
          this.saveCookie(5)
        }, error: (msg) => {
          console.error(msg)
          this.notificationService.newError('Echec lors de la sauvegarde. Merci de réessayer.')
        }
      })
    })
  }

  cancel() {
    this.cookieService.delete(this.COOKIE_NAME)
    window.location.href = window.location.toString()
  }

  saveCookie(minutesExpire: number = 60 * 12) {
    if (!TranslationClientService.changes || Object.keys(TranslationClientService.changes).length == 0) {
      return
    }
    console.log('saved')
    console.log(JSON.stringify(TranslationClientService.changes))
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + minutesExpire)
    this.cookieService.set(this.COOKIE_NAME,
      JSON.stringify(TranslationClientService.changes),
      {expires: date})
  }
}

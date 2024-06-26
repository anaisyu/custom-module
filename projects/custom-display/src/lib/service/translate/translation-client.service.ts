import {computed, Inject, Injectable, signal, Signal} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {NotificationService} from "../notifications/notification.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TranslationClientService {
  public readonly changes: Signal<Object>;
  public editSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public static readonly COOKIE_NAME = "site-text"

  constructor(
    private service: TranslateService,
    private notificationService: NotificationService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    @Inject('backendUrl') private backendUrl: string,
    ) {
    // Retrieve object from the cookie
    const objFromCookie = localStorageService.getValue(TranslationClientService.COOKIE_NAME);
    this.changes = computed(() => objFromCookie() ? JSON.parse(objFromCookie()!) : {})
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
    let set: any = this.changes();

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
        TranslationClientService.merge(original, this.changes())
      ).subscribe({
        next: response => {
          this.notificationService.newMessage('Vos modifications ont bien été sauvegardées.');
          this.localStorageService.setValue(TranslationClientService.COOKIE_NAME, null)
        }, error: (msg) => {
          console.error(msg)
          this.notificationService.newError('Echec lors de la sauvegarde. Merci de réessayer.')
        }
      })
    })
  }

  cancel() {
    this.localStorageService.setValue(TranslationClientService.COOKIE_NAME, null)
    this.refresh();
  }

  private refresh() {
    window.location.href = window.location.toString()
  }

  saveCookie(minutesExpire: number = 15) {
    if (!this.changes() || Object.keys(this.changes()).length == 0) {
      return
    }
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + minutesExpire)
    this.localStorageService.setValue(TranslationClientService.COOKIE_NAME,
      JSON.stringify(this.changes()),
      minutesExpire * 60 * 1000)
  }

  streamTranslation(key: string): Observable<string> {
    let set: any = this.changes();

    const keys: string[] = key.split('.')
    for (let i = 0; i < keys.length - 1; i++) {
      if (!set[keys[i]]) {
        return this.service.stream(key)
      }
      set = set[keys[i]]
    }
    if (set[keys[keys.length - 1]]) {
      return of(set[keys[keys.length - 1]] as string)
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

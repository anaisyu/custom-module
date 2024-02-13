import {Inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, delay, Observable, of} from "rxjs";
import {NotificationService} from "../notifications/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../loading/loading.service";
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
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    // Retrieve object from the cookie
    const objFromCookie = this.cookieService.get(TranslationClientService.COOKIE_NAME);
    if (objFromCookie) {
      this.changes = JSON.parse(objFromCookie)
    } else {
      this.changes = {}
    }

    // Check if "?save" is in the URL
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['save']) {
        // Call the "save()" method
        this.save();

        // Remove "?save" from the URL
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { save: null },
          queryParamsHandling: 'merge',
        });
      }
    });
  }


  // Method to refresh page and redirect by adding "?save" to the URL
  public refreshPageWithSave(): void {
    // Check if "?save" is not already in the URL
    if (!this.activatedRoute.snapshot.queryParams['save']) {
      LoadingService.startLoading()
      window.location.href = window.location.toString() + '?save=' + Math.random()
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
    const loader = new TranslateHttpLoader(this.http)
    loader.getTranslation(lang).subscribe(original => {
      this.http.post(this.backendUrl + '/assets/save/' + lang,
        TranslationClientService.merge(original, this.changes)
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
    this.cookieService.delete(TranslationClientService.COOKIE_NAME)
    this.refresh();
  }

  private refresh() {
    window.location.href = window.location.toString()
  }

  saveCookie(minutesExpire: number = 60 * 12) {
    if (!this.changes || Object.keys(this.changes).length == 0) {
      return
    }
    console.log('saved')
    console.log(JSON.stringify(this.changes))
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + minutesExpire)
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
}

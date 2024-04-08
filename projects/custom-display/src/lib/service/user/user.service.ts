import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../../entities/user";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user?: User;

  constructor(private http: HttpClient, @Inject('backendUrl') private backendUrl: string, @Inject(PLATFORM_ID) private _platformId: Object) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.backendUrl + '/user', {transferCache: false}).pipe(map(
      x => {
        this.user = x
        return x;
      }
    ));
  }

  isAdmin(): boolean {
    return this.user ?  this.hasAdminRole(this.user.roles) : false;
  }

  isSuperAdmin(): boolean {
    return (this.user && this.user.email) ? (this.hasAdminRole(this.user.roles) && this.user.email.includes('dahn')) : false;
  }

  private hasAdminRole(roles: string[]): boolean {
    return roles.includes('ROLE_ADMIN') || this.backendUrl.includes('localhost');
  }

  isAdminOrRedirect(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getUser().subscribe({
        next: user => {
          if (!this.hasAdminRole(user.roles)) {
            window.location.href = this.backendUrl + "/login"
          }
        },
        error: err => {
          console.log(err)
          if (!this.backendUrl.includes('localhost')) {
            window.location.href = this.backendUrl + "/login"
          }
        }
      })
    }
  }
}

import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../../entities/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private roles: string[] = [];

  constructor(private http: HttpClient, @Inject('backendUrl') private backendUrl: string) {

  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.backendUrl + '/user', {transferCache: false}).pipe(map(
      x => {
        this.roles = x.roles ? x.roles : [];
        return x;
      }
    ));
  }

  isAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN') || this.backendUrl.includes('localhost');
  }
}

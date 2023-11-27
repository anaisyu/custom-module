import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../service/loading/loading.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class EnableCredentialsInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    });

    if(request.method != "GET") {
      LoadingService.startLoading();
    }

    return next.handle(request).pipe(finalize(() => {
      if(request.method != "GET") {
        LoadingService.stopLoading();
      }
    }));
  }
}



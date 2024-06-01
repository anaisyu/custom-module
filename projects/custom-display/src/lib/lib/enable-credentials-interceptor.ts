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


    const isGraphQLQuery = request.body && request.body.operationName && request.body.query &&
      request.body.query.trim().startsWith('query');

    if(request.method != "GET" && !isGraphQLQuery) {
      LoadingService.startLoading();
    }

    return next.handle(request).pipe(finalize(() => {
      if(request.method != "GET" && !isGraphQLQuery) {
        LoadingService.stopLoading();
      }
    }));
  }
}



import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize, Observable, throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class DyContactService {
  formData: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });
  private readonly formLoadedTimestamp: number;


  constructor(private http: HttpClient, @Inject('backendUrl') private backendUrl: string) {
    this.formLoadedTimestamp = Date.now();
  }

  sendContactForm(): Observable<any> {
    if (this.formData.invalid || (Date.now() - this.formLoadedTimestamp) < 5000 || this.formData.getRawValue().lastName) {
      return throwError(() => 'form Invalid');
    }
    LoadingService.startLoading()
    return this.http.get(this.backendUrl + '/contact', {params: this.formData.getRawValue()}).pipe(finalize(() => {
      LoadingService.stopLoading()
    }));
  }

}

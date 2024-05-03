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
  formDataLong: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });
  private readonly formLoadedTimestamp: number;

  constructor(private http: HttpClient, @Inject('backendUrl') private backendUrl: string) {
    this.formLoadedTimestamp = Date.now();
  }

  sendContactForm(): Observable<any> {
    return this.send(this.formData)
  }
  sendContactFormLong(): Observable<any> {
    return this.send(this.formDataLong)
  }

  private send(form: FormGroup) : Observable<any> {
    if (form.invalid || (Date.now() - this.formLoadedTimestamp) < 5000 || form.getRawValue().lastName) {
      return throwError(() => 'form Invalid');
    }
    LoadingService.startLoading()
    return this.http.get(this.backendUrl + '/contact', {params: form.getRawValue()}).pipe(finalize(() => {
      LoadingService.stopLoading()
    }));
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private static numberOfLoadingProcess: number = 0;

  constructor() { }

  static startLoading() {
    LoadingService.numberOfLoadingProcess += 1;
  }

  static stopLoading() {
    LoadingService.numberOfLoadingProcess -= 1;
  }

  static isLoading(): boolean {
    return LoadingService.numberOfLoadingProcess != 0;
  }
}

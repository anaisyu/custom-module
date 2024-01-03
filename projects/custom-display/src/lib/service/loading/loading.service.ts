import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private static numberOfLoadingProcess: number = 0;

  constructor() {
  }

  static startLoading() {
    LoadingService.numberOfLoadingProcess += 1;
  }

  static stopLoading() {
    LoadingService.numberOfLoadingProcess -= 1;
    if (LoadingService.numberOfLoadingProcess < 0) {
      console.error("LoadingService: negative number of loading processes")
    }
  }

  static isLoading(): boolean {
    return LoadingService.numberOfLoadingProcess != 0;
  }
}

import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private static numberOfLoadingProcess: WritableSignal<number> = signal(0);

  constructor() {
  }

  static startLoading() {
    LoadingService.numberOfLoadingProcess.set(LoadingService.numberOfLoadingProcess() + 1);
  }

  static stopLoading() {
    LoadingService.numberOfLoadingProcess.set(LoadingService.numberOfLoadingProcess() - 1);
    if (LoadingService.numberOfLoadingProcess() < 0) {
      console.error("LoadingService: negative number of loading processes")
    }
  }

  static isLoading(): Signal<boolean> {
    return computed(() => {return LoadingService.numberOfLoadingProcess() != 0});
  }
}

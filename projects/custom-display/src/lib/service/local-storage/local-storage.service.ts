import { Inject, Injectable, PLATFORM_ID, signal, Signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {TranslationClientService} from "../translate/translation-client.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly values: Map<string, WritableSignal<string | null>> = new Map([])

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, @Inject('LOCAL_STORAGE_KEYS') keys: string[] = []) {
    const localKeys = [TranslationClientService.COOKIE_NAME, ...keys]

    // init
    localKeys.forEach(key => {
      this.values.set(key, signal(null))
    })
    if (isPlatformBrowser(this._platformId)) {
      localKeys.forEach(key => {
        this.values.get(key)?.set(this.getFromStorage(key))
      })
      // Listen for changes to local storage
      window.addEventListener('storage', (event) => {
        if (event.storageArea === localStorage) {
          console.log('new localstorage data')
          localKeys.forEach(key => {
            this.values.get(key)?.set(this.getFromStorage(key))
          })
        }
      });
    }
  }

  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this._platformId)) {
      const item = localStorage.getItem(key);
      if (item) {
        const {value, expiry} = JSON.parse(item);
        if (!expiry || new Date(expiry) > new Date()) {
          return value;
        } else {
          localStorage.removeItem(key); // Remove expired token
        }
      }
    }
    return null;
  }

  setValue(key: string, value: string | null | undefined, expiresInMs: number = 1000*60*60*24*21) {
    if (isPlatformBrowser(this._platformId)) {
      const signalValue = this.values.get(key)!
      if (value && value != signalValue()) {
        const expiry = new Date().getTime() + expiresInMs;
        localStorage.setItem(key, JSON.stringify({value, expiry}));
        signalValue.set(value)
      } else if (!value) {
        localStorage.removeItem(key)
        signalValue.set(null)
      }
    }
  }

  getValue(key: string) : Signal<string | null> {
    return this.values.get(key)!.asReadonly()
  }
}

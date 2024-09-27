import {computed, inject, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 0],
    [Breakpoints.Small, 1],
    [Breakpoints.Medium, 2],
    [Breakpoints.Large, 3],
    [Breakpoints.XLarge, 4],
  ]);
  private currentScreenSize: WritableSignal<number> = signal(2);

  public isXsm() {
    return computed(() => this.currentScreenSize() >= 0)
  }
  public isSm() {
    return computed(() => this.currentScreenSize() >= 1)
  }
  public isMd() {
    return computed(() => this.currentScreenSize() >= 2)
  }
  public isLg() {
    return computed(() => this.currentScreenSize() >= 3)
  }
  public isXl() {
    return computed(() => this.currentScreenSize() >= 4)
  }

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize.set(this.displayNameMap.get(query) ?? 2);
          }
        }
      });
  }
}

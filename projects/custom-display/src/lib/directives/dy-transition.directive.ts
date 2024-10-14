import {
  AfterViewInit,
  Directive,
  ElementRef, HostListener,
  Inject,
  input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Directive({
  selector: '[dyTransition]',
  standalone: true
})
export class DyTransitionDirective implements AfterViewInit, OnInit, OnDestroy {
  private subscription: Subscription = new Subscription()
  private intervalId: any;

  dyTransition = input.required()
  constructor(private elementRef: ElementRef, private router: Router, @Inject(PLATFORM_ID) private _platformId: Object) {
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    if(this.dyTransition() != 'none') {
      this.elementRef.nativeElement.style['view-transition-name'] = this.dyTransition();
    }
    // Listen to router events
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event) {
          this.checkVisibility();
        }
      }));
  }

  private isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const tolerance = 0.1; // 10% tolerance

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const topTolerance = tolerance * windowHeight;
    const leftTolerance = tolerance * windowWidth;

    return (
      rect.top >= -topTolerance &&
      rect.left >= -leftTolerance &&
      rect.bottom <= (1 + tolerance) * windowHeight &&
      rect.right <= (1 + tolerance) * windowWidth
    );
  }

  private checkVisibility(): void {
    if(isPlatformBrowser(this._platformId)) {
      if (this.dyTransition() != 'none') {
        if (this.isElementInViewport(this.elementRef.nativeElement)) {
          this.elementRef.nativeElement.style['view-transition-name'] = `dy-${this.dyTransition()}`;
        } else {
          setTimeout(() => {
            this.elementRef.nativeElement.style['view-transition-name'] = 'none';
          }, 1)
        }
      }
    } else {
      if(this.dyTransition() != 'none') {
        this.elementRef.nativeElement.style['view-transition-name'] = `dy-${this.dyTransition()}`;
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:click', ['$event'])
  @HostListener('window:resize')
  onScroll(): void {
    this.checkVisibility();
  }

  ngAfterViewInit(): void {
    this.checkVisibility(); // Initial check
    if(isPlatformBrowser(this._platformId)) {
      this.intervalId = setInterval(() => {
        this.checkVisibility();
      }, 750); // 500 milliseconds interval
    }
  }
}

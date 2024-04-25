import {
  AfterViewInit,
  Directive,
  ElementRef,
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
  constructor(private elementRef: ElementRef, private router: Router, @Inject(PLATFORM_ID) _platformId: Object) {
    if(isPlatformBrowser(_platformId)) {
      this.intervalId = setInterval(() => {
        this.checkVisibility();
      }, 10); // 10 milliseconds interval
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.checkVisibility();
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
    if(this.dyTransition() != 'none') {
      if (this.isElementInViewport(this.elementRef.nativeElement)) {
        this.elementRef.nativeElement.style['view-transition-name'] = this.dyTransition();
      } else {
        setTimeout(() => {
          this.elementRef.nativeElement.style['view-transition-name'] = 'none';
        }, 1)
      }
    }
  }

  ngAfterViewInit(): void {
    this.checkVisibility(); // Initial check
  }
}

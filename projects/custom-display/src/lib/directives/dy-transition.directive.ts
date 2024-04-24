import {AfterViewInit, Directive, ElementRef, HostListener, input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Directive({
  selector: '[dyTransition]',
  standalone: true
})
export class DyTransitionDirective implements AfterViewInit, OnInit, OnDestroy {
  private subscription: Subscription = new Subscription()
  dyTransition = input.required()
  constructor(private elementRef: ElementRef, private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    }

  ngOnInit(): void {
    this.elementRef.nativeElement.style['view-transition-name'] = this.dyTransition();

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

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:click', ['$event'])
  onScroll(): void {
    this.checkVisibility();
  }

  ngAfterViewInit(): void {
    this.checkVisibility(); // Initial check
  }
}

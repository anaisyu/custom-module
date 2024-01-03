import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeManagerService {
  swipeRight: EventEmitter<void> = new EventEmitter<void>();
  swipeLeft: EventEmitter<void> = new EventEmitter<void>();
  private xDown = null;
  private yDown: any = null;

  constructor() {
  }

  handleStart = (event: TouchEvent) => {
    this.handleTouchStart(event)
  };

  handleMove = (event: TouchEvent) => {
    this.handleTouchMove(event)
  };

  keyPress = (event: KeyboardEvent) => {
    if (event.code == 'ArrowLeft') {
      this.left();
    }
    if (event.code == 'ArrowRight') {
      this.right();
    }
  }

  private getTouches(evt: any): any {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }

  private handleTouchStart(evt: any): any {
    const firstTouch = this.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  };

  private right(): void {
    console.log('right')

    this.swipeRight.emit()
  }

  private left(): void {
    console.log('left')
    this.swipeLeft.emit()
  }

  private handleTouchMove(evt: any): any {
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* right swipe */
        this.right();
      } else {
        /* left swipe */
        this.left()
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
      } else {
        /* up swipe */
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  };
}

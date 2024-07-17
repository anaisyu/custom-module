import {AfterContentChecked, AfterViewInit, Component, ElementRef, HostListener, input, viewChild} from '@angular/core';

@Component({
  selector: 'app-background-image-blurry',
  standalone: true,
  imports: [],
  templateUrl: './background-image.component.html',
  styleUrl: './background-image.component.scss'
})
export class BackgroundImageComponent implements AfterViewInit, AfterContentChecked {
  bgImage = input.required<string>()
  private parentDiv = viewChild<ElementRef>('parentDiv')
  private div1 = viewChild<ElementRef>('div1')
  private div2 = viewChild<ElementRef>('div2')


  ngAfterContentChecked(): void {
    this.adjustDiv1Height();
  }

  ngAfterViewInit(): void {
    this.adjustDiv1Height();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustDiv1Height();
  }

  adjustDiv1Height() {
    const div2Height = this.div2()!.nativeElement.offsetHeight;
    this.div1()!.nativeElement.style.height = `${div2Height + 200}px`;
    this.parentDiv()!.nativeElement.style.height = `${div2Height + 200}px`;
    this.div2()!.nativeElement.style.top = `-${div2Height + 100}px`;
  }
}

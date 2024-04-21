import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChildren
} from '@angular/core';
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
// import Swiper bundle with all modules installed
// @ts-ignore
import Swiper from 'swiper/bundle';
import {DyImage} from "../../../model/dy-image";

@Component({
  selector: 'app-dy-swiper',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './dy-swiper.component.html',
  styleUrl: './dy-swiper.component.scss'
})
export class DySwiperComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('image') imageElements!: QueryList<ElementRef<HTMLImageElement>>;
  withGallery: boolean = false;
  active_id: number = -1;
  @Input({required: true}) pictures!: Array<DyImage>;
  @Input() id: string = 'swiper';
  @Input() noGallery: boolean = false;
  private swiper?: Swiper;
  @Input() themeColor: string = '#646464';

  constructor(
    private ngZone: NgZone, @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }

  ngOnInit(): void {
    this.withGallery = this.noGallery ? false : this.pictures.length > 1;
  }


  goto(id: number): void {
    this.swiper!.slideToLoop(id)
  }


  getThumbnailHeight(pictures: Array<DyImage>) {
    return Math.min(100 / pictures.length, 33);
  }

  ngOnDestroy(): void {
    this.swiper?.destroy()
  }


  updateParentAttributes(): void {
    this.imageElements.forEach(imageElement => {
      const img = imageElement.nativeElement;
      const parentAnchor = img.parentElement;
      if (parentAnchor) {
        // parentAnchor.setAttribute('href', img.src);
        if (img.complete) {
          this.updateAttributes(parentAnchor!, img);
        } else {
          img.onload = () => {
            this.updateAttributes(parentAnchor!, img);
          };
        }
      }
    });
  }

  updateAttributes(parentAnchor: HTMLElement, img: HTMLImageElement): void {
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    const windowHeight = window.innerHeight * 0.9;

    // Update parent <a> attributes
    parentAnchor.setAttribute('data-pswp-width', Math.round(originalWidth / originalHeight * windowHeight).toString());
    parentAnchor.setAttribute('data-pswp-height', windowHeight.toString());
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.swiper = new Swiper(`#${this.id}`, {
        // Optional parameters
        loop: true,
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
          hide: true,
        },

        on: {
          slideChangeTransitionEnd: (swiper: Swiper) => {
            console.log(swiper.realIndex)
            this.changeActiveIndex(swiper.realIndex)
          }
        }
      });

      setTimeout(() => {
      //  this.ngZone.runOutsideAngular(() => {

          this.updateParentAttributes();

          const lightbox = new PhotoSwipeLightbox({
            gallery: `#${this.id}`,
            children: 'a',
            pswpModule: PhotoSwipe,
            zoom: true
          })
          lightbox.init()
       // })
      }, 100);
    }
  }

  changeActiveIndex(index: number): void {
    this.active_id = index;
  }

}

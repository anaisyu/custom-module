import {
  AfterViewInit,
  Component, computed,
  ElementRef,
  Inject,
  input,
  Input,
  InputSignal,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList, Signal, signal,
  SimpleChanges,
  ViewChildren, WritableSignal
} from '@angular/core';
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
// import Swiper bundle with all modules installed
// @ts-ignore
import Swiper from 'swiper/bundle';
import {DyImage} from "../../../model/images/dy-image";
import {DyTransitionDirective} from "../../../directives/dy-transition.directive";
import {DyImgComponent} from "../tag/dy-img/dy-img.component";

@Component({
  selector: 'app-dy-swiper',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DyTransitionDirective,
    DyImgComponent
  ],
  templateUrl: './dy-swiper.component.html',
  styleUrl: './dy-swiper.component.scss'
})
export class DySwiperComponent implements  OnDestroy, AfterViewInit, OnChanges {
  withGallery = computed(() => this.noGallery() ? false : this.pictures() ? this.pictures().length > 1 : false);
  active_id: number = -1;
  pictures: InputSignal<Array<DyImage>> = input.required();
  id = input('swiper')
  noGallery = input(false)
  slidesPerView = input(1)
  spaceBetween = input(0)
  themeColor = input('#646464')
  margin_x: InputSignal<number> = input(5);
  transition: InputSignal<string> = input('none');
  private swiper?: Swiper;
  private lightbox?: PhotoSwipeLightbox;

  sizes = computed(() => {
    const map = new Map<string, { height: WritableSignal<number>, width: WritableSignal<number> }>();
    this.pictures().forEach(pic => {
      map.set(pic.originalUrl, { height: signal(0), width: signal(0) });
    });
    return map
  })

  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
  }


  goto(id: number): void {
    this.swiper!.slideToLoop(id)
  }


  getThumbnailHeight(pictures: Array<DyImage>) {
    return Math.min(100 / pictures.length, 33);
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy()
    this.swiper?.destroy()
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pictures'] && changes['pictures'].previousValue) {
      // Check if inputChangeTrigger has changed
      // You can add more conditions based on your requirements
      this.ngOnDestroy()
      this.ngAfterViewInit()
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.swiper = new Swiper(`#${this.id()}`, {
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
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 640px
          640: {
            navigation: {
              nextEl: '.swiper-button-next-dy' + this.id(),
              prevEl: '.swiper-button-prev-dy' + this.id(),
            },
            spaceBetween: this.spaceBetween(),
            slidesPerView: this.slidesPerView(), // or 4 depending on your preference
          },
          // you can add more breakpoints if needed
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
        this.lightbox = new PhotoSwipeLightbox({
          gallery: `#${this.id()}`,
          children: 'a',
          pswpModule: PhotoSwipe,
          zoom: true
        })
        this.lightbox.init()
      }, 100);
    }
  }

  changeActiveIndex(index: number): void {
    this.active_id = index;
  }

}

import {
  AfterContentInit, AfterViewChecked,
  Component,
  computed,
  ElementRef,
  input, model, output,
  QueryList, signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {DyImage} from "../../../../model/images/dy-image";
import {CompressedUrl} from "../../../../model/images/compressed-url";
import {DyTransitionDirective} from "../../../../directives/dy-transition.directive";

@Component({
  selector: 'dy-img',
  standalone: true,
  imports: [
    DyTransitionDirective
  ],
  templateUrl: './dy-img.component.html',
  styleUrl: './dy-img.component.css'
})
export class DyImgComponent implements AfterViewChecked{
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

  image = input.required<DyImage>()
  alt = input.required<string>()
  transitionName = input<string>('none')
  srcSet = computed(() => {
    return this.image().compressedUrls.map((url: CompressedUrl) => `${url.url} ${url.width}w`).join(', ');
  })
  sizeRatio = signal(100)
  sizes = computed(() => {
    return this.image().compressedUrls.map((url: CompressedUrl) => `(max-width: ${url.width}px) `+ ((Number(url.width)*100)/this.sizeRatio())).join(', ');
  })

  height = model<number>()
  width = model<number>()

  ngAfterViewChecked(): void {
    this.updateParentAttributes();
  }

  updateParentAttributes(): void {
      const img = this.imageElement.nativeElement;
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
  }

  updateAttributes(parentAnchor: HTMLElement, img: HTMLImageElement): void {
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    const windowHeight = window.innerHeight * 0.9;

    this.height.set(img.naturalHeight)
    this.width.set(img.naturalWidth)
 //   // Update parent <a> attributes
 //   parentAnchor.setAttribute('data-pswp-width', Math.round(originalWidth / originalHeight * windowHeight).toString());
 //   parentAnchor.setAttribute('data-pswp-height', windowHeight.toString());
  }
}

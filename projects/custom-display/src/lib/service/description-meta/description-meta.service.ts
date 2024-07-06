import {ElementRef, Inject, Injectable, PLATFORM_ID, Renderer2} from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DescriptionMetaService {

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private meta: Meta) {
  }

  updateSchema(text: string,
               renderer2: Renderer2,
               elementRef: ElementRef
               ) : void {
    if (isPlatformBrowser(this._platformId)) {

      let script = renderer2.createElement('script');
      script.type = `application/ld+json`;
      script.text = text;


      renderer2.appendChild(elementRef.nativeElement, script);
    }
  }

  updateDescription(newDescription: string): void {
    this.meta.updateTag({name: 'description', content: newDescription});
  }

  appendToBaseDescription(desc: string) {
    // this.updateDescription($ loc alize `Anaïs ゆ - also called AnaïsYu - is a swiss artist and painter. ` + desc);
  }
}

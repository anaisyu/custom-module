import {ElementRef, Inject, Injectable, PLATFORM_ID, Renderer2} from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class DescriptionMetaService {

  constructor(
    private meta: Meta) {
  }

  updateDescription(newDescription: string): void {
    this.meta.updateTag({name: 'description', content: newDescription});
  }

  appendToBaseDescription(desc: string) {
    // this.updateDescription($ loc alize `Anaïs ゆ - also called AnaïsYu - is a swiss artist and painter. ` + desc);
  }
}

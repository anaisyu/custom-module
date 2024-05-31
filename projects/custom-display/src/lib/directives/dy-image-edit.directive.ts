import {Directive, ElementRef, HostListener, Inject, Input, OnInit} from '@angular/core';
import {zip} from "rxjs";
import {TranslationClientService} from "../service/translate/translation-client.service";
import {ImageUploadService} from "../service/image-upload/image-upload.service";
import {UploadImageResponse} from "../model/images/upload-image-response";

@Directive({
  selector: '[libDyImageEdit]',
  standalone: true
})
export class DyImageEditDirective implements OnInit {
  @Input({required: true}) libDyImageEdit!: string;
  @Input({required: true}) src!: string;

  private editMode: boolean = false;

  constructor(private el: ElementRef, private clientService: TranslationClientService, private imageUploadService: ImageUploadService, @Inject('backendUrl') private backendUrl: string) {
  }

  @HostListener('click')
  public onKeyup(): void {
    if (this.editMode) {
      this.imageUploadService.openDialog().subscribe(res => {
        this.changeImage(res.urls.originalUrl, res.alt)
        this.save(res.urls, res.alt)
      })
    }
  }

  save(response: UploadImageResponse, alt: string) {
    if (response && alt) {
      this.clientService.next('images.' + this.libDyImageEdit + '.originalUrl', response.originalUrl)
      this.clientService.next('images.' + this.libDyImageEdit + '.thumbnailUrl', response.thumbnailUrl)
      response.compressedUrls.forEach((compressedUrl, index) => {
        this.clientService.next('images.' + this.libDyImageEdit + '.compressed.' + index + '.url', compressedUrl.url)
        this.clientService.next('images.' + this.libDyImageEdit + '.compressed.' + index + '.height', compressedUrl.height)
        this.clientService.next('images.' + this.libDyImageEdit + '.compressed.' + index + '.width', compressedUrl.width)
      })
      this.clientService.next('images.' + this.libDyImageEdit + '.alt', alt)
    }
  }

  ngOnInit(): void {
    const originalBorder = this.el.nativeElement.style.border;
    this.clientService.editSubject.subscribe(editMode => {
      this.editMode = editMode;

      // Get the native element using ElementRef
      const element = this.el.nativeElement;
      // Check the condition and apply the dashed border if needed
      if (this.editMode) {
        element.style.border = '2px dashed #a9a9a9';
      } else {
        element.style.border = originalBorder;
      }
    })

    const urlKey = 'images.' + this.libDyImageEdit + '.originalUrl'
    const altKey = 'images.' + this.libDyImageEdit + '.alt'

    const key1$ = this.clientService.streamTranslation(urlKey);
    const key2$ = this.clientService.streamTranslation(altKey);

    zip([key1$, key2$]).subscribe(([url, alt]) => {
      if (urlKey != url || altKey != alt) {
        this.changeImage(url, alt)
      }
      this.el.nativeElement.contentEditable = this.editMode;
    })
  }

  changeImage(url: string, alt: string) {
    this.el.nativeElement.src = url
    this.el.nativeElement.alt = alt

  }

}

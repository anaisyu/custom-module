import {
  AfterViewInit,
  Component,
  computed,
  HostListener,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import {UploadImageResponse} from "../../../model/images/upload-image-response";
import {zip} from "rxjs";
import {TranslationClientService} from "../../../service/translate/translation-client.service";
import {ImageUploadService} from "../../../service/image-upload/image-upload.service";
import {DyImgComponent} from "../tag/dy-img/dy-img.component";

@Component({
  selector: 'lib-dy-picture',
  standalone: true,
  imports: [
    DyImgComponent
  ],
  templateUrl: './dy-picture.component.html',
  styleUrl: './dy-picture.component.css'
})
export class DyPictureComponent implements OnInit, AfterViewInit {
  readonly originalSrc: InputSignal<string> = input.required<string>();
  readonly originalAlt: InputSignal<string> = input.required<string>();
  readonly key: InputSignal<string> = input.required<string>();
  readonly imgClass: InputSignal<string> = input<string>('');
  readonly lazy: InputSignal<boolean> = input<boolean>(false);
  readonly proportion: InputSignal<number> = input<number>(100);

  private readonly storedImage: WritableSignal<UploadImageResponse | undefined> = signal(undefined)
  readonly imageToDisplay: Signal<UploadImageResponse> = computed(() => {
    return this.storedImage() ?? {originalUrl: this.originalSrc(), thumbnailUrl: this.originalSrc(), compressedUrls: []}
  })
  private readonly storedAlt: WritableSignal<string | undefined> = signal(undefined)
  readonly altToDisplay: Signal<string> = computed(() => {
    return this.storedAlt() ?? this.originalAlt()
  })
  editMode = signal(false);

  constructor(private clientService: TranslationClientService, private imageUploadService: ImageUploadService) {
  }

  ngAfterViewInit(): void {
    this.clientService.editSubject.subscribe(editMode => {
      this.editMode.set(editMode);
    })
  }

  @HostListener('click')
  public onKeyup(): void {
    if (this.editMode()) {
      this.imageUploadService.openDialog().subscribe(res => {
        this.changeImage(res.urls, res.alt)
        this.save(res.urls, res.alt)
      })
    }
  }

  save(response: UploadImageResponse, alt: string) {
    if (response && alt) {
      this.clientService.next('images.' + this.key() + '.originalUrl', response.originalUrl)
      this.clientService.next('images.' + this.key() + '.thumbnailUrl', response.thumbnailUrl)
      response.compressedUrls.forEach((compressedUrl, index) => {
        this.clientService.next('images.' + this.key() + '.compressed-' + index + '.url', compressedUrl.url)
        this.clientService.next('images.' + this.key() + '.compressed-' + index + '.height', compressedUrl.height)
        this.clientService.next('images.' + this.key() + '.compressed-' + index + '.width', compressedUrl.width)
      })
      this.clientService.next('images.' + this.key() + '.alt', alt)
    }
  }

  ngOnInit(): void {

    const urlKey = 'images.' + this.key() + '.originalUrl'
    const altKey = 'images.' + this.key() + '.alt'

    const key1$ = this.clientService.streamTranslation(urlKey);
    const key2$ = this.clientService.streamTranslation(altKey);
    /* *** IMPORTANT here is the number of different image compress size returned by backend (5): "400", "600", "800", "1000", "1200" *** */
    const keyUrl0$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-0.url');
    const keyHeight0$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-0.height');
    const keyWidth0$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-0.width');
    const keyUrl1$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-1.url');
    const keyHeight1$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-1.height');
    const keyWidth1$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-1.width');
    const keyUrl2$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-2.url');
    const keyHeight2$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-2.height');
    const keyWidth2$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-2.width');
    const keyUrl3$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-3.url');
    const keyHeight3$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-3.height');
    const keyWidth3$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-3.width');
    const keyUrl4$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-4.url');
    const keyHeight4$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-4.height');
    const keyWidth4$ = this.clientService.streamTranslation('images.' + this.key() + '.compressed-4.width');

    zip([
      key1$, key2$,
      keyUrl0$, keyHeight0$, keyWidth0$, keyUrl1$, keyHeight1$, keyWidth1$, keyUrl2$, keyHeight2$, keyWidth2$, keyUrl3$, keyHeight3$, keyWidth3$, keyUrl4$, keyHeight4$, keyWidth4$

    ]).subscribe(([url, alt,
                    keyUrl0,
                    keyHeight0,
                    keyWidth0,
                    keyUrl1,
                    keyHeight1,
                    keyWidth1,
                    keyUrl2,
                    keyHeight2,
                    keyWidth2,
                    keyUrl3,
                    keyHeight3,
                    keyWidth3,
                    keyUrl4,
                    keyHeight4,
                    keyWidth4
                  ]) => {
      if (urlKey != url || altKey != alt) {
        const image: UploadImageResponse = {
          originalUrl: url, thumbnailUrl: url, compressedUrls: [
            {url: keyUrl0, width: keyWidth0, height: keyHeight0},
            {url: keyUrl1, width: keyWidth1, height: keyHeight1},
            {url: keyUrl2, width: keyWidth2, height: keyHeight2},
            {url: keyUrl3, width: keyWidth3, height: keyHeight3},
            {url: keyUrl4, width: keyWidth4, height: keyHeight4},
          ].filter(x => x.url.includes('://'))
        }
        this.changeImage(image, alt)
      }
    })
  }

  changeImage(image: UploadImageResponse, alt: string) {
    const smallerImage = image.compressedUrls.find((elem) => {
      return elem.height == '400' || elem.width == '400'
    })
    image.thumbnailUrl = smallerImage?.url ?? image.thumbnailUrl

    this.storedImage.set(image)
    this.storedAlt.set(alt)
  }

}

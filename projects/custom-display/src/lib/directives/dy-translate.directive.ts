import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {TranslationClientService} from "../service/translate/translation-client.service";

@Directive({
  standalone: false,
  selector: '[appDyTranslate]'
})
export class DyTranslateDirective implements AfterViewInit {
  @Input({required: true}) appDyTranslate!: string;
  private editMode: boolean = false;

  constructor(private el: ElementRef, private service: TranslateService, private clientService: TranslationClientService) {
    const originalBorder = el.nativeElement.style.outline;
    this.clientService.editSubject.subscribe(editMode => {
      this.editMode = editMode;
      this.el.nativeElement.contentEditable = this.editMode;

      // Get the native element using ElementRef
      const element = this.el.nativeElement;

      // Check the condition and apply the dashed border if needed
      if (this.editMode) {
        element.style.outline = '1px dashed #a9a9a9';
      } else {
        element.style.outline = originalBorder;
      }
    })
  }

  @HostListener('keyup', ['$event']) public onKeyup(event: KeyboardEvent): void {
    const value: string = this.el.nativeElement.innerHTML
    if(value) {
      this.clientService.next(this.appDyTranslate, value)
    }
  }

  ngAfterViewInit(): void {
    this.service.get(this.appDyTranslate).subscribe(value => {
      console.log('here')
      console.log(value)
      console.log(this.appDyTranslate)
      if(value == this.appDyTranslate && this.el.nativeElement.innerHTML){
        this.clientService.next(this.appDyTranslate, this.el.nativeElement.innerHTML)
      } else {
        this.el.nativeElement.innerHTML = value;
      }
      this.el.nativeElement.contentEditable = this.editMode;
    })
  }

}

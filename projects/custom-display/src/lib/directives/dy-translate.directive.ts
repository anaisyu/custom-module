import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {TranslationClientService} from "../service/translate/translation-client.service";
import {DyTextEditorService} from "../service/dy-text-editor/dy-text-editor.service";

@Directive({
  standalone: false,
  selector: '[appDyTranslate]'
})
export class DyTranslateDirective implements AfterViewInit {
  @Input({required: true}) appDyTranslate!: string;
  private editMode: boolean = false;
  private previousValue: string = '';


  constructor(private el: ElementRef, private service: TranslateService, private clientService: TranslationClientService, private dyTextEditorService: DyTextEditorService) {
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

  @HostListener('keyup', ['$event']) public onKeyup(event: any): void {
    const value: string = this.el.nativeElement.innerHTML
    if(value != this.previousValue) {
      this.previousValue = value
      this.dyTextEditorService.addNewEditorData(this.appDyTranslate, value)
      this.save(value)
    }
  }

  @HostListener('click') onClick() {
    if(this.editMode && this.appDyTranslate.includes('editor')) {
      this.dyTextEditorService.displayService.next(true)
      setTimeout(() => {
        this.dyTextEditorService.addNewEditorData(this.appDyTranslate, this.el.nativeElement.innerHTML)
      }, 50)
    } else {
      this.dyTextEditorService.displayService.next(false)
    }
  }

  save(value: string) {
    if(value) {
      this.clientService.next(this.appDyTranslate, value)
    }
  }

  ngAfterViewInit(): void {
    this.service.stream(this.appDyTranslate).subscribe(value => {
      if(value == this.appDyTranslate && this.el.nativeElement.innerHTML){
       // this.clientService.next(this.appDyTranslate, this.el.nativeElement.innerHTML)
      } else {
        this.el.nativeElement.innerHTML = value;
      }
      this.el.nativeElement.contentEditable = this.editMode;
    })

    this.dyTextEditorService.editorDataChange.subscribe((newValue) => {
      if(newValue.key == this.appDyTranslate){
        if(newValue.value != this.previousValue) {
          this.previousValue = newValue.value
          this.el.nativeElement.innerHTML = newValue.value
          this.save(newValue.value)
        }
      }
    })
  }

}

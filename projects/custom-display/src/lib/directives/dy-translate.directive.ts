import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {TranslationClientService} from "../service/translate/translation-client.service";
import {DyTextEditorService} from "../service/dy-text-editor/dy-text-editor.service";

@Directive({
  standalone: true,
  selector: '[appDyTranslate]'
})
export class DyTranslateDirective implements OnInit, AfterViewInit {
  @Input({required: true}) appDyTranslate!: string;
  private editMode: boolean = false;
  private previousValue: string = '';


  constructor(private el: ElementRef, private renderer: Renderer2, private clientService: TranslationClientService, private dyTextEditorService: DyTextEditorService) {
  }

  ngOnInit(): void {
    const originalBorder = this.el.nativeElement.style.outline;

    this.renderer.listen(this.el.nativeElement, 'paste', (event) => {
      event.preventDefault();
      const text = (event.clipboardData).getData('text');
      this.renderer.setProperty(this.el.nativeElement, 'innerText', this.el.nativeElement.innerText + text);
    });


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

  addNewEditorData(value: string) {
    if (this.appDyTranslate.includes('editor')) {
      this.dyTextEditorService.addNewEditorData(this.appDyTranslate, value)
    }
  }

  @HostListener('keyup', ['$event'])
  public onKeyup(event: any): void {
    const value: string = this.el.nativeElement.innerHTML
    if (value != this.previousValue) {
      this.previousValue = value
      this.addNewEditorData(value)
      this.save(value)
    }
  }

  @HostListener('click') onClick() {
    if (this.editMode && this.appDyTranslate.includes('editor')) {
      this.dyTextEditorService.displayEditorSubject.next(true)
      setTimeout(() => {
        this.addNewEditorData(this.el.nativeElement.innerHTML)
      }, 50) // why this timeout?
    } else {
      this.dyTextEditorService.displayEditorSubject.next(false)
    }
  }

  save(value: string) {
    if (value) {
      this.clientService.next(this.appDyTranslate, value)
    }
  }

  ngAfterViewInit(): void {
    this.clientService.streamTranslation(this.appDyTranslate).subscribe(value => {
      if (value == this.appDyTranslate && this.el.nativeElement.innerHTML) {
        this.clientService.next(this.appDyTranslate, this.el.nativeElement.innerHTML)
      } else {
        this.el.nativeElement.innerHTML = value;
      }
      this.el.nativeElement.contentEditable = this.editMode;
    })

    if (this.appDyTranslate.includes('editor')) {
      this.dyTextEditorService.editorDataChange.subscribe((newValue) => {
        if (newValue.key == this.appDyTranslate) {
          if (newValue.value != this.previousValue) {
            this.previousValue = newValue.value
            this.el.nativeElement.innerHTML = newValue.value
            this.save(newValue.value)
          }
        }
      })
    }
  }

}

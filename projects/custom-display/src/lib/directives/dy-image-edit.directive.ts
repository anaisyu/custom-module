import {Directive, ElementRef, HostListener} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {TranslationClientService} from "../service/translate/translation-client.service";
import {DyTextEditorService} from "../service/dy-text-editor/dy-text-editor.service";

@Directive({
  selector: '[libDyImageEdit]',
  standalone: true
})
export class DyImageEditDirective {
  private editMode: boolean = false;

  constructor(private el: ElementRef, private service: TranslateService, private clientService: TranslationClientService, private dyTextEditorService: DyTextEditorService) {
    const originalBorder = el.nativeElement.style.outline;
    this.clientService.editSubject.subscribe(editMode => {
      this.editMode = editMode;

      // Get the native element using ElementRef
      const element = this.el.nativeElement;
      // Check the condition and apply the dashed border if needed
      if (this.editMode) {
        element.style.outline = '2px dashed #a9a9a9';
      } else {
        element.style.outline = originalBorder;
      }
    })
  }


  @HostListener('click')
  public onKeyup(): void {
    if(this.editMode){
      alert('will change')
    }
  }

}

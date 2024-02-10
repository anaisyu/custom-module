import {Component, signal} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {TranslationClientService} from "../../../service/translate/translation-client.service";
import {DyTextEditorService} from "../../../service/dy-text-editor/dy-text-editor.service";
import {ChangeColorsService} from "../../../service/change-colors-service/change-colors.service";

@Component({
  selector: 'lib-translate-edit',
  templateUrl: './translate-edit.component.html',
  styleUrls: ['./translate-edit.component.css']
})
export class TranslateEditComponent {
  constructor(public userService: UserService, public assetService: TranslationClientService, public dyTextEditorService: DyTextEditorService, private colorService: ChangeColorsService) {
  }

  edit() {
    this.assetService.editSubject.next(true);
  }

  display() {
    this.assetService.editSubject.next(false);
    this.dyTextEditorService.displayEditorSubject.next(false);
  }

  cancel() {
    this.colorService.displaySubject.next(false)
    this.assetService.cancel();
  }

  save() {
    this.assetService.refreshPageWithSave();
  }

  color() {
    this.colorService.displaySubject.next(true)
  }
}

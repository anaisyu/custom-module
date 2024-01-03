import {Component} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {TranslationClientService} from "../../../service/translate/translation-client.service";
import {DyTextEditorService} from "../../../service/dy-text-editor/dy-text-editor.service";

@Component({
  selector: 'lib-translate-edit',
  templateUrl: './translate-edit.component.html',
  styleUrls: ['./translate-edit.component.css']
})
export class TranslateEditComponent {
  constructor(public userService: UserService, public assetService: TranslationClientService, public dyTextEditorService: DyTextEditorService) {
  }

  edit() {
    this.assetService.editSubject.next(true);
  }

  display() {
    this.assetService.editSubject.next(false);
  }

  cancel() {
    this.assetService.cancel();
  }

  save() {
    this.assetService.save();
  }
}

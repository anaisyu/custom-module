import {Component} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {TranslationClientService} from "../../../service/translate/translation-client.service";
import {DyTextEditorService} from "../../../service/dy-text-editor/dy-text-editor.service";
import {ChangeColorsService} from "../../../service/change-colors-service/change-colors.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DyTextEditorComponent} from "../../dy-text-editor/dy-text-editor.component";

@Component({
  selector: 'lib-translate-edit',
  standalone: true,
  templateUrl: './translate-edit.component.html',
  imports: [
    NgIf,
    MatButton,
    AsyncPipe,
    MatIcon,
    DyTextEditorComponent
  ],
  styleUrls: ['./translate-edit.component.css']
})
export class TranslateEditComponent {
  protected full: boolean = false;

  constructor(public userService: UserService, public assetService: TranslationClientService, public dyTextEditorService: DyTextEditorService, private colorService: ChangeColorsService) {
  }

  edit() {
    this.userService.isAdminOrRedirect();
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
    this.userService.isAdminOrRedirect();
    this.assetService.save();
  }

  color() {
    this.colorService.displaySubject.next(true)
  }

  fullScreen() {
    this.full = !this.full;
  }

  sync() {
    this.assetService.sync();
  }
}

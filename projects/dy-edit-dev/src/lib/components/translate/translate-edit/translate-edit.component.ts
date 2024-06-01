import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DyTextEditorComponent} from "../../dy-text-editor/dy-text-editor.component";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ChangeColorsService, DyTextEditorService, TranslationClientService, UserService} from "dy-custom-display";

@Component({
  selector: 'lib-translate-edit',
  standalone: true,
  templateUrl: './translate-edit.component.html',
  imports: [
    NgIf,
    MatButton,
    AsyncPipe,
    MatIcon,
    DyTextEditorComponent,
    MatSlideToggle
  ],
  styleUrls: ['./translate-edit.component.css']
})
export class TranslateEditComponent {
  protected full: boolean = false;

  constructor(public userService: UserService, public assetService: TranslationClientService, public dyTextEditorService: DyTextEditorService, private colorService: ChangeColorsService) {
  }

  edit($event: MatSlideToggleChange) {
    this.userService.isAdminOrRedirect();
    this.assetService.editSubject.next($event.checked);
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

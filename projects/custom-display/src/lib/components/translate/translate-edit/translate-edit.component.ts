import { Component } from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {TranslationClientService} from "../../../service/translate/translation-client.service";

@Component({
  selector: 'lib-translate-edit',
  templateUrl: './translate-edit.component.html',
  styleUrls: ['./translate-edit.component.css']
})
export class TranslateEditComponent {
  constructor(public userService: UserService, public assetService: TranslationClientService) {
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

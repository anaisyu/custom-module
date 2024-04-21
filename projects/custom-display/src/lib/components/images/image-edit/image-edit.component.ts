import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {TranslationClientService} from "../../../service/translate/translation-client.service";

@Component({
  selector: 'lib-image-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-edit.component.html',
  styleUrl: './image-edit.component.css'
})
export class ImageEditComponent {
  @Input() defaultUrl: string = '';
  @Input({required: true}) private name!: string;

  constructor(private service: TranslateService, private clientService: TranslationClientService) {

  }

}

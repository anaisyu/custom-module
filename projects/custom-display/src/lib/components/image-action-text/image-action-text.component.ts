import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe} from "@angular/common";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";
import {TranslationClientService} from "../../service/translate/translation-client.service";
import {DyPictureComponent} from "../images/dy-picture/dy-picture.component";

@Component({
  selector: 'app-image-action-text',
  standalone: true,
  imports: [
    RouterLink,
    DyTranslateDirective,
    MatIcon,
    DyPictureComponent,
    AsyncPipe
  ],
  templateUrl: './image-action-text.component.html',
  styleUrl: './image-action-text.component.scss'
})
export class ImageActionTextComponent {
  src = input.required<string>()
  uniqueId = input.required<string>()
  url = input.required<string[]>()
  alignEnd = input(false)
  title = input<string>('Title');

  constructor(protected clientService: TranslationClientService) {
  }
}

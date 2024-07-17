import {Component, input} from '@angular/core';
import {DyPanelComponent} from "../dy-panel/dy-panel.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";
import {DyPictureComponent} from "../images/dy-picture/dy-picture.component";
import {DyImgComponent} from "../images/tag/dy-img/dy-img.component";

@Component({
  selector: 'app-images-with-middle-action',
  standalone: true,
  imports: [
    DyPanelComponent,
    MatButton,
    RouterLink,
    DyImgComponent,
    DyPictureComponent,
    DyTranslateDirective
  ],
  templateUrl: './images-with-middle-action.component.html',
  styleUrl: './images-with-middle-action.component.scss'
})
export class ImagesWithMiddleActionComponent {
 defaultImageLeft = input.required<string>()
 defaultImageRight = input.required<string>()
 uniqueId = input.required<string>()
 btnLink = input.required<string[]>()

}

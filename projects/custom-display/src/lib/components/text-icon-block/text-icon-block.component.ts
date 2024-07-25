import {Component, input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";

@Component({
  selector: 'app-text-icon-block',
  standalone: true,
  imports: [
    MatIconModule,
    DyTranslateDirective
  ],
  templateUrl: './text-icon-block.component.html',
  styleUrl: './text-icon-block.component.scss'
})
export class TextIconBlockComponent {
  materialIconName = input.required<string>();
  uniqueId = input.required<string>();
  title = input.required<string>();
  desc = input<string>('');
}

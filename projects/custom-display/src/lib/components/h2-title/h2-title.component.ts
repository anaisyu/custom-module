import {Component, ElementRef, input, InputSignal, ViewChild} from '@angular/core';
import {DyTranslateDirective} from "../../directives/dy-translate.directive";

@Component({
  selector: 'lib-h2-title',
  standalone: true,
  imports: [
    DyTranslateDirective
  ],
  templateUrl: './h2-title.component.html',
  styleUrl: './h2-title.component.css'
})
export class H2TitleComponent {
  uniqueId: InputSignal<string> = input.required()
  defaultTitle = input<string>('TITLE');
  defaultDescription = input<string>('TITLE');
}

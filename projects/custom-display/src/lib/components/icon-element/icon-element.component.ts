import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";

@Component({
  imports: [
    DyTranslateDirective,
    MatIcon,
    NgForOf,
    NgIf
  ],
  selector: 'app-icon-element',
  standalone: true,
  styleUrl: './icon-element.component.scss',
  templateUrl: './icon-element.component.html'
})
export class IconElementComponent {
    @Input() key: string = 'default'
    @Input({required: true}) cols!: number;
    @Input() row: number = 1;
    @Input() icon: boolean = false;
    @Input() oval: boolean = false;
    @Input() round: boolean = false;
    @Input() title: boolean = true;
    @Input() mainTitle: boolean = true;
    @Input() cardTransparency: number = 0;
    @Input() desc: boolean = false;
    @Input() backgroundColor: string = 'var(--dy-primary)'; // Default background color
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.css']
})
export class CustomTextComponent {
  @Input() title: string = '';
  @Input() desc: string = '';

}

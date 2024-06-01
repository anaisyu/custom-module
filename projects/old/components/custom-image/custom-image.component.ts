import {Component, Input} from '@angular/core';
import {Image} from "../../openapi";

@Component({
  selector: 'app-custom-image[image]',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css']
})
export class CustomImageComponent {
  @Input() image!: Image;
  @Input() full: boolean = false;
  @Input() parallax: boolean = false;


}

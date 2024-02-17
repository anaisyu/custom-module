import {Component} from '@angular/core';
import {NotificationService} from "../../service/notifications/notification.service";
import {NgIf} from "@angular/common";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  imports: [
    NgIf,
    DyTranslateDirective
  ],
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  show: boolean = false;
  error: boolean = false;
  message: string = '';

  private timeout: number = -1;

  constructor(private service: NotificationService) {
    this.service.successMessage.subscribe((msg) => {
      this.message = msg;
      this.show = true;
      this.error = false;
      this.prepareStop()
    })
    this.service.errorMessage.subscribe((msg) => {
      this.message = msg;
      this.show = true;
      this.error = true;
      this.prepareStop()
    })
  }

  prepareStop() {
    console.log('prepare')
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('end')
      this.show = false;
    }, 8000);
  }

  stop() {
    this.show = false;
  }
}

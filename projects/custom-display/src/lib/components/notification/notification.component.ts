import {Component} from '@angular/core';
import {NotificationService} from "../../service/notifications/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
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

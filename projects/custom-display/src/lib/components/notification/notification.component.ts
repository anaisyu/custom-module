import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../service/notifications/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  show: boolean = false;
  message: string = '';
  i = 0;
  private timeout: number = -1;
  constructor(private service: NotificationService) {
    this.service.successMessage.subscribe((msg) => {
      this.message = msg;
      this.show = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.show = false;
      }, 8000);
    })
  }

  ngOnInit(): void {
  }

  stop() {
    this.show = false;
  }
}

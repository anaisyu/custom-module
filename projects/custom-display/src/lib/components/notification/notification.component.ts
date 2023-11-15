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

  private timeout: number = -1;
  constructor(private service: NotificationService) {
    this.service.successMessage.subscribe((msg) => {
      console.log('new notification')
      this.message = msg;
      this.show = true;
      console.log(this.show)
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        console.log('end')
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

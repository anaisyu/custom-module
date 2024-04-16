import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-my-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './my-card.component.html',
  styleUrl: './my-card.component.scss'
})
export class MyCardComponent {
  @Input({required: true}) title!: string;
  @Input() withExitButton: boolean = false;
  @Output() exitEmitter = new EventEmitter<boolean>;

  exit() {
    this.exitEmitter.next(true);
  }
}

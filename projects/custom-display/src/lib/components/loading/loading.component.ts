import {Component, input, Input, Signal} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {LoadingService} from "../../service/loading/loading.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'lib-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  material = input(true);
  isLoading: Signal<boolean>;

  constructor() {
    this.isLoading = LoadingService.isLoading()
  }
}

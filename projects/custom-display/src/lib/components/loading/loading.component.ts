import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingService} from "../../service/loading/loading.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'lib-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @Input() public material: boolean = false;

  isLoading(): boolean {
    return LoadingService.isLoading();
  }
}

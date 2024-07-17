import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-dy-panel',
  standalone: true,
  imports: [],
  templateUrl: './dy-panel.component.html',
  styleUrl: './dy-panel.component.scss'
})
export class DyPanelComponent {
  backgroundColor = input<string>('white');
  padding = input<boolean>(true);
  closeButton = input<boolean>(false)
  closed = output<boolean>()

  closePanel() {
    this.closed.emit(true)
  }
}

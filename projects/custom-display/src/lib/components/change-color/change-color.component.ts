import {afterNextRender, AfterViewInit, ApplicationRef, Component, OnInit, Renderer2} from '@angular/core';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ColorPickerModule} from "ngx-color-picker";
import {MatButtonModule} from "@angular/material/button";
import {Subject} from "rxjs";
import {MyCardComponent} from "../my-card/my-card.component";
import {ChangeColorsService} from "../../service/change-colors-service/change-colors.service";

@Component({
  selector: 'app-change-color',
  standalone: true,
  imports: [
    NgForOf,
    ColorPickerModule,
    MyCardComponent,
    NgIf,
    AsyncPipe,
    MatButtonModule,
    JsonPipe,
    KeyValuePipe
  ],
  templateUrl: './change-color.component.html',
  styleUrl: './change-color.component.scss'
})
export class ChangeColorComponent implements OnInit{

  constructor(public service: ChangeColorsService, private renderer: Renderer2) {
    afterNextRender(() => {
      service.getStylesFromCssFile()
    })
  }

  save() {
    this.service.save()
  }

  ngOnInit(): void {
    this.service.getStylesFromConfigFile(this.renderer)
  }

  exit() {
    this.service.displaySubject.next(false)
  }

  changeCssVariable(name: string, cssVariable: string) {
    this.service.changeCssVariable(name, cssVariable, this.renderer)
  }
}

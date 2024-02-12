import {afterNextRender, AfterViewInit, ApplicationRef, Component, OnInit, Renderer2} from '@angular/core';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Subject} from "rxjs";
import {MyCardComponent} from "../my-card/my-card.component";
import {ChangeColorsService} from "../../service/change-colors-service/change-colors.service";
import {NgxColorsModule} from "ngx-colors";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-change-color',
  standalone: true,
  imports: [
    NgForOf,
    MyCardComponent,
    NgIf,
    AsyncPipe,
    MatButtonModule,
    JsonPipe,
    KeyValuePipe,
    NgxColorsModule,
    FormsModule
  ],
  templateUrl: './change-color.component.html',
  styleUrl: './change-color.component.scss'
})
export class ChangeColorComponent {

  constructor(public service: ChangeColorsService, private renderer: Renderer2) {
    afterNextRender(() => {
      service.getStylesFromCssFile()
    })

    this.service.getStylesFromConfigFile(this.renderer)
  }

  save(key: string, value: string) {
    this.changeCssVariable(key, value)
    this.service.save()
  }


  exit() {
    this.service.displaySubject.next(false)
  }

  changeCssVariable(name: string, cssVariable: string) {
    this.service.changeCssVariable(name, cssVariable, this.renderer)
  }
}

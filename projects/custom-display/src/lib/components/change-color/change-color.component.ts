import {
  afterNextRender,
  AfterViewInit,
  ApplicationRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2
} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ColorPickerModule} from "ngx-color-picker";
import {MatButtonModule} from "@angular/material/button";
import {Subject} from "rxjs";
import {MyCardComponent} from "../my-card/my-card.component";
import {TranslationClientService} from "../../service/translate/translation-client.service";

@Component({
  selector: 'app-change-color',
  standalone: true,
  imports: [
    NgForOf,
    ColorPickerModule,
    MyCardComponent,
    NgIf,
    AsyncPipe,
    MatButtonModule
  ],
  templateUrl: './change-color.component.html',
  styleUrl: './change-color.component.scss'
})
export class ChangeColorComponent implements AfterViewInit{
  cssVariableNames: string[] = [
    '--dy-background-color',
    '--header-bg',
    '--dy-text-1',
    '--dy-text-2',
    '--dy-text-primary',
    '--dy-text',
    '--dy-primary',
    '--dy-primary-dark',
    '--dy-primary-hover',
    '--dy-primary-light',
    '--bs-body-bg'
  ];
  private cssVariables: { [key: string]: string } = {};
  cssVariablesSubject: Subject<{ [key: string]: string }> = new Subject<{ [key: string]: string }>()
  @Output() exitEmitter = new EventEmitter<boolean>;

  constructor(private clientService: TranslationClientService, private renderer: Renderer2, private app: ApplicationRef) {
    afterNextRender(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      this.cssVariableNames.forEach(variable => {
        this.cssVariables[variable] = rootStyles.getPropertyValue(variable).trim();
      });
    })
  }

  changeCssVariable(variable: string, newValue: string) {
    this.cssVariables[variable] = newValue;

    this.overrideCssProperties();
  }

  overrideCssProperties() {
    let style = '';
    for (const variable in this.cssVariables) {
      style += `${variable}: ${this.cssVariables[variable]};\n`
    }
    this.renderer.setProperty(this.app.components[0].injector.get(ElementRef).nativeElement, 'style',style);
    this.cssVariablesSubject.next(this.cssVariables)
  }

  save() {
    for (const variable in this.cssVariables) {
      this.clientService.next("colors." + variable, this.cssVariables[variable])
    }
    this.clientService.refreshPageWithSave()
  }

  ngAfterViewInit(): void {
    for (const name of this.cssVariableNames) {
      this.clientService.streamTranslation("colors." + name).subscribe(value => {
        console.log('translation ' + value)
        if(value) {
          if (value == name) {
            // this.clientService.next(name, this.cssVariables[name])
          } else {
            this.changeCssVariable(name, value)
          }
        }
      })
    }
  }

  exit() {
    this.exitEmitter.next(true)
  }
}

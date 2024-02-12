import {ApplicationRef, ElementRef, Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {TranslationClientService} from "../translate/translation-client.service";

@Injectable({
  providedIn: 'root'
})
export class ChangeColorsService {
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
  cssVariablesSubject: Subject<{ [key: string]: string }> = new BehaviorSubject<{ [key: string]: string }>({})

  displaySubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private element?: ElementRef;

  constructor(private clientService: TranslationClientService) { }

  getStylesFromCssFile() {
    const rootStyles = getComputedStyle(document.documentElement);
    this.cssVariableNames.forEach(variable => {
      if(!this.cssVariables[variable]) {
        this.cssVariables[variable] = rootStyles.getPropertyValue(variable).trim();
      }
    });
    this.cssVariablesSubject.next(Object.assign({}, this.cssVariables))
  }

  registerElementRef(element: ElementRef){
    this.element = element;
  }

  getStylesFromConfigFile(renderer: Renderer2) {
    for (const name of this.cssVariableNames) {
      this.clientService.streamTranslation("colors." + name).subscribe(value => {
        if (value && value != ("colors." + name)) {
          this.changeCssVariable(name, value, renderer)
        }
      })
    }
  }


  changeCssVariable(name: string, newValue: string, renderer: Renderer2) {
    this.cssVariables[name] = newValue;

    this.overrideCssProperties(renderer);
  }

  overrideCssProperties(renderer: Renderer2) {
    let style = '';
    for (const variable in this.cssVariables) {
      style += `${variable}: ${this.cssVariables[variable]};\n`
    }
    if(this.element) {
      renderer.setProperty(this.element.nativeElement, 'style', style);
    }
    console.log(this.cssVariables)
    this.cssVariablesSubject.next(Object.assign({}, this.cssVariables))
  }

  save() {
    for (const variable in this.cssVariables) {
      this.clientService.next("colors." + variable, this.cssVariables[variable])
    }
    this.clientService.refreshPageWithSave()
  }
}

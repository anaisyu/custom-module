import {ElementRef, Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Subject} from "rxjs";
import {TranslationClientService} from "../translate/translation-client.service";
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChangeColorsService {
  cssVariableNames: string[] = [
    '--dy-color-1-original',
    '--dy-color-2-original',
    '--dy-color-3-original',
    '--dy-color-4-original',
    '--dy-color-5-original',
    '--dy-color-6-original',
    '--dy-color-7-original',
    '--dy-primary',
    '--dy-primary-hover',
    '--dy-secondary',
    '--dy-secondary-hover',
    '--dy-text',
    '--dy-text-primary',
    '--dy-text-secondary',
  ];
  private cssVariables: { [key: string]: string } = {};
  private paletteCssVariables: { [key: string]: string } = {};
  cssVariablesSubject: Subject<{ [key: string]: string }> = new BehaviorSubject<{ [key: string]: string }>({})
  paletteSubject: Subject<string[]> = new BehaviorSubject<string[]>([])

  displaySubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private element?: ElementRef;


  private readonly ready1: Subject<boolean> = new Subject();
  private readonly ready2: Subject<boolean> = new Subject();

  ready: Observable<boolean> = combineLatest([this.ready1, this.ready2]).pipe(
    map(([val1, val2]) => val1 && val2)
  );



  constructor(private clientService: TranslationClientService) { }

  getStylesFromCssFile() {
    const rootStyles = getComputedStyle(document.documentElement);
    this.cssVariableNames.forEach(variable => {
      if(rootStyles.getPropertyValue(variable).trim()) {
        if (variable.includes('original')) {
          this.paletteCssVariables[variable] = rootStyles.getPropertyValue(variable).trim();
        } else if (!this.cssVariables[variable]) {
          this.cssVariables[variable] = rootStyles.getPropertyValue(variable).trim();
        }
      }
    });
    this.cssVariablesSubject.next(Object.assign({}, this.cssVariables))
    this.paletteSubject.next(Object.values(this.paletteCssVariables));
    this.ready1.next(true)
  }

  registerElementRef(element: ElementRef){
    // used in app component
    this.element = element;
  }

  getStylesFromConfigFile(renderer: Renderer2) {
    for (const name of this.cssVariableNames) {
      this.clientService.streamTranslation("colors." + name).subscribe(value => {
        if (value && value != ("colors." + name)) {
          this.changeCssVariable(name, value, renderer)
          this.cssVariablesSubject.next(Object.assign({}, this.cssVariables))
        }
      })
    }
    setTimeout(() => {
      this.ready2.next(true)
    }, 200)
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
  }

  save() {
    for (const variable in this.cssVariables) {
      this.clientService.next("colors." + variable, this.cssVariables[variable])
    }
  }
}

import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {TranslationClientService} from "../service/translate/translation-client.service";
import {combineLatest, Subject, takeUntil} from "rxjs";

@Directive({
  standalone: false,
  selector: '[appDyDisplay]'
})
export class DyDisplayDirective implements AfterViewInit, OnDestroy {
  @Input({required: true}) appDyDisplay!: string;
  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef, private service: TranslateService, private clientService: TranslationClientService) {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    combineLatest([this.service.get(this.appDyDisplay), this.clientService.editSubject])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([translateValue, editValue]) => {
        // Do something with both values
        if(translateValue != this.appDyDisplay || editValue){
          this.el.nativeElement.style.display = 'block'
        } else {
          this.el.nativeElement.style.display = 'none'
        }
      });
  }
}

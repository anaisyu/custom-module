import {Component, Input, OnInit} from '@angular/core';
import {CalendlyService} from "../../service/calendly-service/calendly.service";

@Component({
    selector: 'lib-calendly',
    standalone: true,
    imports: [],
    templateUrl: './calendly.component.html',
    styleUrl: './calendly.component.scss'
})
export class CalendlyComponent implements OnInit {
    @Input({required: true}) url!: string;

    ngOnInit() {
        CalendlyService.showEventEmitter.subscribe(x => {
            if (x) {
                this.show()
            }
        })
    }

    show(): void {
        // @ts-ignore
        Calendly.initPopupWidget({
            url: this.url,
        })
        /*
        Calendly.initInlineWidget({
          url: this.url,
          parentElement: document.getElementById('calendly-embed')
        });*/
    }
}

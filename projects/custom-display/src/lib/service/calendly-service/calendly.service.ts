import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalendlyService {
    public static readonly showEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    static show() {
        this.showEventEmitter.next(true)
    }
}

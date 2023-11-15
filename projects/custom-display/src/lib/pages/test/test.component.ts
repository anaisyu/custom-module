import {Component, OnInit} from '@angular/core';
import {TestService} from "./test.service";
import {Observable} from "rxjs";
import {CustomDisplayElement} from "../../openapi";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    config$: Observable<CustomDisplayElement> = new Observable<CustomDisplayElement>();

    constructor(private service: TestService) {

    }

    ngOnInit(): void {
        this.config$ = this.service.getConfig();
    }


}

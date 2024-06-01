import {Component, OnInit} from '@angular/core';
import {TestService} from "./test.service";
import {Observable} from "rxjs";
import {CustomDisplayElement} from "../../openapi";

@Component({
    selector: 'app-test-edit',
    templateUrl: './test-edit.component.html',
    styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent implements OnInit {
    config$: Observable<CustomDisplayElement> = new Observable<CustomDisplayElement>();

    constructor(private service: TestService) {

    }

    ngOnInit(): void {
        this.config$ = this.service.getConfig();
    }
}

import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {SchemaOrgService} from "../../service/schema-org/schema-org.service";

@Component({
  selector: 'lib-schema-org',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './schema-org.component.html',
  styleUrl: './schema-org.component.css'
})
export class SchemaOrgComponent {
  constructor(public schema: SchemaOrgService) {

  }
}

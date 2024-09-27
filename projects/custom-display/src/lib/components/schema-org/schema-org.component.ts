import {Component, ElementRef, Renderer2} from '@angular/core';
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
  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    public schema: SchemaOrgService) {
    schema.text$.subscribe(text => {
      const element = elementRef.nativeElement;
      const children = element.children
      for (let child of children) {
        renderer.removeChild(element, child);
      }
      if(text) {
        let script = renderer.createElement('script');
        script.type = `application/ld+json`;
        script.text = text

        renderer.appendChild(elementRef.nativeElement, script);
      }
    })
  }
}

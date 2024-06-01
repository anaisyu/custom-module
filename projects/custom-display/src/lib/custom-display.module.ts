import {NgModule} from '@angular/core';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {DyTranslateDirective} from "./directives/dy-translate.directive";
import {MatIcon} from "@angular/material/icon";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    DyTranslateDirective,
    MatIcon,
  ],
  exports: [
  ]
})
export class CustomDisplayModule {
}

import {NgModule} from '@angular/core';
import {TestComponent} from "./pages/test/test.component";
import {TestEditComponent} from "./pages/test/test-edit.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {CustomImageComponent} from './components/custom-image/custom-image.component';
import {CustomTextComponent} from './components/custom-text/custom-text.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CustomDisplayComponent} from './components/custom-display/custom-display.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {DyDisplayDirective} from "./directives/dy-display.directive";
import {DyTranslateDirective} from "./directives/dy-translate.directive";
import {ChangeColorComponent} from "./components/change-color/change-color.component";
import {MatIcon} from "@angular/material/icon";


@NgModule({
  declarations: [
    TestComponent,
    TestEditComponent,
    CustomImageComponent,
    CustomTextComponent,
    CustomDisplayComponent,
    DyDisplayDirective,
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
    ChangeColorComponent,
    MatIcon,
  ],
  exports: [
    TestComponent,
    TestEditComponent,
    DyDisplayDirective,
  ]
})
export class CustomDisplayModule {
}

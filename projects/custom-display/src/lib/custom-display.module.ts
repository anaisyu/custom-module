import { NgModule } from '@angular/core';
import {TestComponent} from "./pages/test/test.component";
import {TestEditComponent} from "./pages/test/test-edit.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import { CustomImageComponent } from './components/custom-image/custom-image.component';
import { CustomTextComponent } from './components/custom-text/custom-text.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { CustomDisplayComponent } from './components/custom-display/custom-display.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import { TranslateEditComponent } from './components/translate/translate-edit/translate-edit.component';
import {NotificationComponent} from "./components/notification/notification.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {DyDisplayDirective} from "./directives/dy-display.directive";
import {DyTextEditorComponent} from "./components/dy-text-editor/dy-text-editor.component";
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
    TranslateEditComponent,
    NotificationComponent
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
        LoadingComponent,
        DyTextEditorComponent,
        DyTranslateDirective,
        ChangeColorComponent,
        MatIcon,
    ],
  exports: [
    TestComponent,
    TestEditComponent,
    DyDisplayDirective,
    TranslateEditComponent,
    NotificationComponent,
    LoadingComponent,
  ]
})
export class CustomDisplayModule { }

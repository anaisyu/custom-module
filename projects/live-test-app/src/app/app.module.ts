import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BlockImgTextComponent,
  ContactFormComponent,
  DyPanelComponent,
  H2TitleComponent,
  DyTitleZoomComponent,
  ImageActionTextComponent, TextIconBlockComponent
} from "dy-custom-display";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    BlockImgTextComponent,
    ContactFormComponent,
    DyPanelComponent,
    DyTitleZoomComponent,
    H2TitleComponent,
    ImageActionTextComponent,
    TextIconBlockComponent,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: 'backendUrl', useValue: 'environment.backend_url',
    },
    {
      provide: 'imageupload_url', useValue: 'environment.imageupload_url',
    },
    {
      provide: 'LOCAL_STORAGE_KEYS', useValue: [],
    },
    {
      provide: 'PAYMENT_HOST', useValue: 'https://payment.dahn.ch',
    },
    {
      provide: 'siteTitleBase', useValue: 'environment.title',
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

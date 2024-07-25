import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CookiesComponent} from "./pages/cookies/cookies.component";

const routes: Routes = [{title: 'cookie', path: 'cookies', component: CookiesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

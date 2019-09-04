import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';
import { PagesListComponent } from "./pages/pages-list.component";
import { PageDetailComponent } from "./page-detail/page-detail.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RootComponent,
    PagesListComponent,
    PageDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "", component: PagesListComponent}
    ])  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }

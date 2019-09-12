import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';
import { PagesListComponent } from "./pages-list/pages-list.component";
import { PageDetailComponent } from "./page-detail/page-detail.component";
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PageThumbnailComponent } from './page-thumbnail/page-thumbnail.component';

@NgModule({
	declarations: [
		RootComponent,
		PagesListComponent,
		PageDetailComponent,
		PageThumbnailComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule
	],
	bootstrap: [RootComponent]
})
export class AppModule { }

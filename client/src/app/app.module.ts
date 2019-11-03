import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RootComponent } from './root.component';
import { PagesListComponent } from "./pages-list/pages-list.component";
import { PageDetailComponent } from "./page-detail/page-detail.component";
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PageThumbnailComponent } from './page-thumbnail/page-thumbnail.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		RootComponent,
		PagesListComponent,
		PageDetailComponent,
		PageThumbnailComponent,
		AdminComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		ReactiveFormsModule
	],
	bootstrap: [RootComponent]
})
export class AppModule { }

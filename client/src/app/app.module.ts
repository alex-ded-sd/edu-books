import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';

import { RootComponent } from './root.component';
import { PagesListComponent } from "./pages-list/pages-list.component";
import { PageDetailComponent } from "./page-detail/page-detail.component";

import { PageThumbnailComponent } from './page-thumbnail/page-thumbnail.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

export function tokenGetter() {
	return localStorage.getItem('token');
}

@NgModule({
	declarations: [
		RootComponent,
		PagesListComponent,
		PageDetailComponent,
		PageThumbnailComponent,
		AdminComponent,
		LoginComponent,
		NavComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		ModalModule.forRoot(),
		BsDropdownModule.forRoot(),
		JwtModule.forRoot({
			config: {
			  tokenGetter: tokenGetter,
			  whitelistedDomains: ["localhost:5000"]
			}
		  })
	],
	bootstrap: [RootComponent]
})
export class AppModule { }

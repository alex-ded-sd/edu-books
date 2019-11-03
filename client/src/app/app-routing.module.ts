import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesListComponent } from './pages-list/pages-list.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
	{path: "", component: PagesListComponent},
	{path: "pages/:pageId", component: PageDetailComponent},
	{path: "login", component: LoginComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { RootComponent } from './root.component';


const routes: Routes = [
	{path: "pages/:pageId", component: PageDetailComponent},
	// {path: "login", component: LoginComponent},
	{path: "admin", component: AdminComponent, data: {role: 'Admin'}, canActivate: [AuthGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

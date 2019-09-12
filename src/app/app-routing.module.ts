import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesListComponent } from './pages-list/pages-list.component';
import { PageDetailComponent } from './page-detail/page-detail.component';


const routes: Routes = [
	{path: "", component: PagesListComponent},
	{path: "pages/:pageId", component: PageDetailComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

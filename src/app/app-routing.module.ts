import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesListComponent } from './pages/pages-list.component';


const routes: Routes = [
  {path: "", component: PagesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

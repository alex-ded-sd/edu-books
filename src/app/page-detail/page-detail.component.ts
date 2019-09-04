import { Component, Input } from '@angular/core';

@Component({
	selector: 'page-detail',
	templateUrl: './page-detail.component.html'
})
export class PageDetailComponent {
	@Input() page:any;
}

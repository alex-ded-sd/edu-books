import { Component, Input } from '@angular/core';

@Component({
	selector: 'page-detail',
	templateUrl: './page-detail.component.html',
	styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent {
	@Input() page:any;
}

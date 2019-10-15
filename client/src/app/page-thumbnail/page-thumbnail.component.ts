import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../models/page';

@Component({
	selector: 'page-thumbnail',
	templateUrl: './page-thumbnail.component.html',
	styleUrls: ['./page-thumbnail.component.css']
})
export class PageThumbnailComponent implements OnInit {
	@Input() page:Page;
	constructor() { }

	ngOnInit() {
	}

}

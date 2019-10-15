import { Component, OnInit } from "@angular/core";
import { PagesService } from '../services/pages.service';
import { Page } from '../models/page';

@Component({
	selector: 'pages-list',
	styleUrls: ['/pages-list.component.css'],
	templateUrl: './pages-list.component.html'
})
export class PagesListComponent implements OnInit {
	pages: Page[];

	constructor(private pagesService: PagesService) {
		
	}
	ngOnInit(): void {
		this.pages = this.pagesService.getPages();
	}
	
}
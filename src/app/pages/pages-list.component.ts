import { Component, OnInit } from "@angular/core";
import { PagesService } from '../services/pages.service';
import { IPage } from '../models/ipage';

@Component({
	selector: 'pages-list',
	styleUrls: ['/pages-list.component.css'],
	templateUrl: './pages-list.component.html'
})
export class PagesListComponent implements OnInit {
	pages: IPage[];

	constructor(private pagesService: PagesService) {
		
	}
	ngOnInit(): void {
		this.pages = this.pagesService.getPages();
	}
	
}
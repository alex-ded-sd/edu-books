import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Page } from '../models/page';
import { PagesService } from '../services/pages.service';

@Component({
	selector: 'page-detail',
	templateUrl: './page-detail.component.html',
	styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {
	page: Page;

	constructor(private pagesService: PagesService,
				private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		const pageId = +this.route.snapshot.paramMap.get('pageId');
		this.getPage(pageId);
	}
	getPage(pageId: number) {
		this.page = this.pagesService.getPage(pageId);
	}
	
}

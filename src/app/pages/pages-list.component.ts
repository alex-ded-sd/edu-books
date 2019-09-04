import { Component } from "@angular/core";

@Component({
	selector: 'pages-list',
	styleUrls: ['/pages-list.component.css'],
	templateUrl: './pages-list.component.html'
})
export class PagesListComponent {
	pages = [
		{
			description: "first-page",
			imageUrl: "url"
		},
		{
			description: "second-page",
			imageUrl: "url"
		}
	]
}
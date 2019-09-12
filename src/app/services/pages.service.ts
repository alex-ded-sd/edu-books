import { Injectable } from '@angular/core';
import { Page } from '../models/page';

@Injectable({
	providedIn: 'root'
})
export class PagesService {
	pages: Page[] = [
		{
			id: 1,
			name: "Страничка стартовая страничка",
			imageUrl: "assets/1.jpg",
			price: "100 грн."
		},
		{
			id: 2,
			name: "Отличная страничка из фетра",
			imageUrl: "assets/2.jpg",
			price: "300 грн."
		},
		{
			id: 3,
			name: "Страничка \"Одень девочку\"",
			imageUrl: "assets/3.jpg",
			price: "230 грн."
		},
		{
			id: 4,
			name: "Страничка «Радуга»",
			imageUrl: "assets/4.jpg",
			price: "150 грн."
		},
		{
			id: 5,
			name: "Страничка «Цветик-семицветик»",
			imageUrl: "assets/5.jpg",
			price: "130 грн.",
			description: "Божьи коровки идут в комплекте к страничке «Божья коровка», если хотите заказать только данную страничку с божьими коровками, то дополнительно оплачивается 40 грн."
		},
		{
			id: 6,
			name: "Страничка «Божья коровка»",
			imageUrl: "assets/6.jpg",
			price: "170 грн."
		},
		{
			id: 7,
			name: "Страничка «Ваза с цветами»",
			imageUrl: "assets/7.jpg",
			price: "150 грн."
		},
		{
			id: 8,
			name: "Страничка «Покорми ципленка»",
			imageUrl: "assets/8.jpg",
			price: "140 грн."
		},
		{
			id: 9,
			name: "Страничка «Рыбалка»",
			imageUrl: "assets/9.jpg",
			price: "170 грн."
		},
		{
			id: 10,
			name: "Страничка «Пингвин»",
			imageUrl: "assets/10.jpg",
			price: "130 грн.",
			description: "Удочка идет в комплекте со страничкой «Рыбалка»"
		},
		{
			id: 11,
			name: "Страничка «Улитка»",
			imageUrl: "assets/11.jpg",
			price: "130 грн."
		},
		{
			id: 12,
			name: "Страничка «Прихожая с куколкой»",
			imageUrl: "assets/12.jpg",
			price: "140 грн."
		}
	];

	getPages(): Page[] {
		return this.pages;
	};

	getPage(pageId: number) {
		return this.pages.find(page => page.id === pageId);
	}
}

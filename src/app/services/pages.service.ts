import { Injectable } from '@angular/core';
import { IPage } from '../models/ipage';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  
  getPages(): IPage[] {
    return [
      {
        description: "Какая красота",
        imageUrl: "assets/1.jpg"
      },
      {
        description: "Просто божественно",
        imageUrl: "assets/2.jpg"
      }
    ]
  }
}

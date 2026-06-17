import { Injectable } from '@angular/core';
import { Product } from './product';

// @Injectable({
//   providedIn: 'root',
// })
export class ProductService {
  getProducts(): Product[] {
    return [
      { id: 1, title: 'Keyboard', price: 100, categories: { 1: 'Computing', 2: 'Peripherals' } },
      { id: 2, title: 'Microphone', price: 35, categories: { 3: 'Multimedia' } },
      { id: 3, title: 'Web camera', price: 79, categories: { 1: 'Computing', 3: 'Multimedia' } },
      { id: 4, title: 'Tablet', price: 500, categories: { 4: 'Entertainment' } },
      { id: 5, title: 'Monitor', price: 60, categories: { 4: 'Entertainment' } },
      { id: 6, title: 'Mouse', price: 20, categories: { 4: 'Entertainment' } },
    ];
  }
}

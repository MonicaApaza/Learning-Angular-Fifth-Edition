import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { APP_SETTINGS } from './app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    const options = new HttpParams().set('limit', 5);
    return this.http.get<Product[]>(this.productsUrl, { params: options });
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }
}

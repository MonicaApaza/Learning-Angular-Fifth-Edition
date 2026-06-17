import { Injectable } from '@angular/core';
import { ProductService } from '../product-service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService extends ProductService {
  override getProducts() {
    return super.getProducts().slice(1, 4);
  }
}

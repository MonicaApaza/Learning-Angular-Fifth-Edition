import { Injectable } from '@angular/core';
import { ProductService } from '../product-service';
import { Product } from '../product';
@Injectable()
export class ProductViewService {
  private product: Product | undefined;
  constructor(private productService: ProductService) {}

  getProduct(id: number): Product | undefined {
    const products = this.productService.getProducts();
    if (!this.product) {
      // ← si ya tiene algo, no busca de nuevo
      this.product = products.find((product) => product.id === id);
    }
    return this.product;
  }
}

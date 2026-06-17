import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products$ : Observable<Product[]>|undefined;
  selectedProduct: Product | undefined;

  constructor(private productService:ProductsService){
    this.products$ = productService.getProducts();
  }

  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }
}

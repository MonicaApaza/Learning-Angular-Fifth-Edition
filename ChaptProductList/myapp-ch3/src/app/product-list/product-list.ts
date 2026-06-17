import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { Product } from '../product';
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from "../sort-pipe";
 import { ProductService } from '../product-service';
import { Favorites } from '../favorites/favorites';
import { ProductView } from '../product-view/product-view';
import { ProductViewService } from '../product-view/product-view-service';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetail, SortPipe, Favorites, ProductView],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  // providers: [ ProductService ]
  providers: [ ProductService, ProductViewService ]
})
export class ProductList implements OnInit, AfterViewInit {
  productDetail = viewChild(ProductDetail);
  products: Product[] = [];
  selectedProduct: Product | undefined = undefined;
   private productService4 = inject(ProductService);


  ngOnInit(): void {
    this.products = this.productService4.getProducts();
    this.selectedProduct = this.products[0];
  }

  ngAfterViewInit(): void {
    console.log('ProductList ngAfterViewInit');
  }

  pickProduct(product: Product) {
    this.selectedProduct = product;
  }

  onAdded(product: Product) {
    alert(`Added ${product.title} to cart!`);
  }
}

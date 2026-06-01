import { AfterViewInit, Component, viewChild } from '@angular/core';
import { Product } from '../product';
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from "../sort-pipe";

@Component({
  selector: 'app-product-list',
  imports: [ProductDetail, SortPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log('ProductList ngAfterViewInit', this.productDetail()!.product2());
  }
  productDetail = viewChild(ProductDetail);
  products: Product[] = [
    {
      id: 1,
      title: 'Keyboard',
      price: 100,
      categories: {
        1: 'Computing',
        2: 'Peripherals',
      },
    },
    {
      id: 2,
      title: 'Microphone',
      price: 35,
      categories: { 3: 'Multimedia' },
    },
    {
      id: 3,
      title: 'Web camera',
      price: 79,
      categories: {
        1: 'Computing',
        3: 'Multimedia',
      },
    },
    {
      id: 4,
      title: 'Tablet',
      price: 500,
      categories: { 4: 'Entertainment' },
    },
  ];
  selectedProduct: Product | undefined = this.products[0];

  pickProduct(product: Product) {
    this.selectedProduct = product;
  }

  onAdded(product: Product) {
    alert(`Added ${product.title} to cart!`);
  }
}

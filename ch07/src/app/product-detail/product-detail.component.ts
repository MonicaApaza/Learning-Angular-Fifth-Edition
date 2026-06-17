import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnChanges {
  product$ :  Observable<Product>|undefined;
  added = output();
  id = input<number>();

  constructor(private productService:ProductsService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  addToCart() {
    this.added.emit();
  }
}

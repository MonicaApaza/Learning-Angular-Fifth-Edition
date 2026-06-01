import { ChangeDetectionStrategy, Component, input, output, OnInit, ViewEncapsulation, DestroyRef, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail implements OnInit, OnChanges {
  // constructor() {
  //   console.log('ProductDetail ctor', this.product2());
  // }

  ngOnInit(): void {
    console.log('ProductDetail ngOnInit', this.product2());
  }

  constructor(destroyRef: DestroyRef) {
    destroyRef.onDestroy(() => {
      // "Resetting timers and interval
      // Unsubscribing from observable streams"
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const productChange = changes['product2'];

    if (!productChange.isFirstChange()) {
      const previousProduct = productChange.previousValue;
      const currentProduct = productChange.currentValue;
      console.log('cambio de:', previousProduct?.title, 'a:', currentProduct?.title);
    }
  }

  product2 = input<Product>();
  added = output<Product>();

  get productTitle() {
    return this.product2()?.title ?? 'No product selected';
  }

  onAddToCart() {
    const product = this.product2();
    if (product) {
      this.added.emit(product);
    }
  }
}

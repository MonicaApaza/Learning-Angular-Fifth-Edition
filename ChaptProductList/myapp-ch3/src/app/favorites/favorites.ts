import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product-service';
import { CommonModule } from '@angular/common';
import { FavoritesService } from './favorites-service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  providers: [ { provide: ProductService, useClass: FavoritesService } ]

})
export class Favorites implements OnInit {
  products: Product[] = [];

  constructor(productService: ProductService) {
    this.products = productService.getProducts();
  }

  ngOnInit(): void {
  }
}

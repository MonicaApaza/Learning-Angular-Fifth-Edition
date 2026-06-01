import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Copyright } from './copyright';
import { Numeric } from './numeric';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, Copyright, Numeric],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp-ch3');
}

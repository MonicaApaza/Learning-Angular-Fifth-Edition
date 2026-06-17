import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css',
})
export class HelloComponent {
  protected count = signal(0);

  increaseCounter() {
    this.count.update((value) => value + 1);
  }

  decreaseCounter() {
    this.count.update((value) => value - 1);
  }

  resetCounter() {
    this.count.set(0);
  }
}

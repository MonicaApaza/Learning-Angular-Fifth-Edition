import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { Observable } from 'rxjs';
import { DataService } from './Patrones/common/data.service';
import { Post } from './Patrones/common/interfaces';
import { CommonModule } from '@angular/common';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { HelloComponent } from './hello/hello.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective, CommonModule, KeyLoggerComponent, HelloComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  title = 'World';
  settings = inject(APP_SETTINGS);
  title$: Observable<void> = new Observable((observer) => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  counter = 0;
  counter$: Observable<void> = new Observable((observer) => {
    setInterval(() => {
      observer.next();
    }, 1000);
  });

  public postData$!: Observable<Post>;
  subjectMessage$!: Observable<string>;

  constructor(private dataService: DataService) {
    this.title$.subscribe(this.setTitle.bind(this));
    this.counter$.subscribe(() => {
      this.counter++;
    });
    this.dataService.getPost().subscribe((post) => {
      console.log(post);
    });

    this.postData$ = this.dataService.getPost();
  }

  private setTitle() {
    // console.log(this.settings);
    const timeStamp = new Date();

    this.title = `${this.settings.title} - ${timeStamp.toLocaleTimeString()}`;
  }
}

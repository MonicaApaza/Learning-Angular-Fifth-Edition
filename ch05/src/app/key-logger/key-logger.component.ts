import { Component, ElementRef, OnInit, viewChild, input } from '@angular/core';
import { filter, from, fromEvent, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  imports: [],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.css',
})
export class KeyLoggerComponent implements OnInit {
  input = viewChild<ElementRef>('keyContainer');
  keys = '';
  numeric = input(false)

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.input()!.nativeElement,
      'keyup',
    );
    // logger$.subscribe((evt => this.keys += evt.key));

    logger$.pipe(
      map((event) =>  event.key.charCodeAt(0)),
      filter(code => {
        if(this.numeric()){
          return (code >31 && (code < 48 || code > 57))? false : true;
        }
        return false;
      }),
      tap((digit) => (this.keys += String.fromCharCode(digit)))).subscribe();
  }
}

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCopyright]',
})
export class Copyright {
  constructor(el: ElementRef) {
    const currentYear = new Date().getFullYear();
    const targetElement: HTMLElement = el.nativeElement;
    targetElement.classList.add('copyright');
    targetElement.textContent = `© ${currentYear} My Company. All rights reserved.`;
  }
}

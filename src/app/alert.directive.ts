import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.innerHTML = `
    <div class="alert alert-danger fade show">
      <span>Welcome</span>
    </div>
    `;
  }
}

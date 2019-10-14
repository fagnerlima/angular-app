import { Component } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html'
})
export class PageFooterComponent {

  get hoje(): Date {
    return new Date();
  }
}

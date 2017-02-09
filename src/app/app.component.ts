import { Component, ViewContainerRef } from '@angular/core';
import { CommonService } from './core';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>'
  //templateUrl: './app.template.html'
})
export class AppComponent {

  constructor(
    private common: CommonService,
    private viewContainerRef: ViewContainerRef
  ) {
    common.AppComponentRef = viewContainerRef;
  }

}
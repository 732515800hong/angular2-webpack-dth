import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  curUrl: string;

  constructor(
    private router: Router
  ) {
    this.curUrl = router.url.toString();
  }

}
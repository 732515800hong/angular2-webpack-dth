import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../../core';

@Component({
  selector: 'main-product',
  templateUrl: './product.component.html'
})
export class MainProductComponent implements OnInit {

  title: string;

  constructor(
    private router: Router,
    private routeService: RouteService
  ) {
    this.title = '产品';
  }

  ngOnInit() { }


  routeLinkNative($event: Event) {
    this.router.navigate(['/main/home']);
  }

}
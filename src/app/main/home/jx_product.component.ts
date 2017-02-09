import { Component, Output, EventEmitter } from '@angular/core';
import { JxProductService } from './jx_product.service';

@Component({
  selector: 'app-jxprod',
  templateUrl: './jx_product.component.html'
})
export class JxProductComponent {

  products: Array<any>;
  totalorder: number = 0;
  devicesWidth: number;
  @Output() completed: EventEmitter<any> = new EventEmitter();

  constructor(
    private jxProductService: JxProductService
  ) {
    this.devicesWidth = window.innerWidth - 90;
    this.products = [];
    this.jxProductService.getJxProduct()
      .subscribe((result: any) => {
        if (result.code == 1) {
          this.products = result.data;
          this.completed.emit({ status: 'success' });
        } else {
          this.completed.emit({ status: 'fail', message: result.data });
        }
      });
  }

  selectProduct() {

  }

}
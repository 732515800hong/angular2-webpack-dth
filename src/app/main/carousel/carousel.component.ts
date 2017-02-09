import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent {

  values: Array<any>;
  radius: Array<any>;
  @Output() completed: EventEmitter<any> = new EventEmitter();

  constructor(
    private window: Window,
    private carouselService: CarouselService
  ) {
    this.getCarousels();
  }

  getCarousels() {

    this.carouselService.getAdList({ typeid: 29, num: 10 })
      .subscribe(result => {
        if (result.code == 1) {
          this.values = result.data;
          this.initValues();
          this.completed.emit({ status: 'success' });
        } else {
          this.completed.emit({ status: 'fail', message: result.data });
        }
      });

  }

  initValues() {

    if (this.values && this.values.length > 0) {
      this.radius = [];
      this.values.forEach((item, i) => {
        if (i == 0) {
          this.radius.push({ active: true });
        } else {
          this.radius.push({ active: false });
        }
      });
      if (this.values.length > 1) {
        var size = this.values.length;
        this.values.push(this.values[0]);
        this.values.splice(0, 0, this.values[size - 1]);
      }
    }
  }

}
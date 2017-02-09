import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core';
import { MainRoutingModule } from './main.routing';

import { CarouselComponent, CarouselService } from './carousel';
import { HomeComponent, JxProductComponent, JxProductService } from './home';
import { MainProductComponent } from './product/product.component';

@NgModule({
  imports: [SharedModule, CoreModule, HttpModule, MainRoutingModule],
  declarations: [HomeComponent, MainProductComponent, CarouselComponent, JxProductComponent],
  providers: [CarouselService, JxProductService]
})
export class MainModule { }

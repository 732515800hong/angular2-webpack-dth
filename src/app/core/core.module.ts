import { NgModule, ValueProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteService } from './routeservice/route.service';
import { CommonService } from './common/common';
import { DialogModule } from './dialog/dialog.module';
import { LimitPipe } from './pipe/string-extend.pipe';
import { CarouselSliderDirective } from './directive/carousel.directive';

const WINDOW_PROVIDER: ValueProvider = {
  provide: Window,
  useValue: window
}

const DOCUMENT_PROVIDER: ValueProvider = {
  provide: Document,
  useValue: document
}

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [LimitPipe, CarouselSliderDirective],
  providers: [RouteService, CommonService, WINDOW_PROVIDER, DOCUMENT_PROVIDER],
  exports: [DialogModule, LimitPipe, CarouselSliderDirective]
})
export class CoreModule { }

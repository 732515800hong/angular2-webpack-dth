import { Component, Input, Output } from '@angular/core';
import { CommonService } from '../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() showBackIcon: boolean = false;
  @Input() utilType: string = '';
  @Input() title: string = '';
  @Input() backArgs: Array<any>;

  utilClass: { [key: string]: boolean } = {};

  constructor(
    private common: CommonService
  ) {
    this.utilClass = {
      'header_right_icon_base base_img': true,
      'is_h_r_icon': this.utilType == 'note',
      'c_i_h_r_icon': this.utilType == 'setting'
    };
  }

  onHeaderIconClick($event: Event) {
    $event.stopPropagation();
    let redirectUrl: string, checkUrls: string[];
    let backArgs = this.backArgs;
    if (backArgs && backArgs.length > 0) {
      if (backArgs.length == 1) {
        redirectUrl = backArgs[0];
      } else {
        checkUrls = !(backArgs[0] instanceof Array) ? [backArgs[0]] : backArgs[0];
        redirectUrl = backArgs[1];
      }
    }
    this.common.routeBack(checkUrls, redirectUrl);
  }

}
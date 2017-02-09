import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})

export class LimitPipe implements PipeTransform {
  transform(value: any, limit: number): any {
    if (!value || (typeof value !== "string" && Object.prototype.toString.call(value) !== '[object Array]')) {
      return value;
    }
    if (value.length <= limit) {
      return value;
    }
    if (typeof value === "string") {
      value.substr(0, limit);
    } else {
      value.slice(0, (limit - 1));
    }
    return value;
  }
}
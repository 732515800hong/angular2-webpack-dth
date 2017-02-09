import { Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveRouters } from '../routeservice/route.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class CommonService {

  public AppComponentRef: ViewContainerRef;
  public ApiHost: string;

  constructor(
    private router: Router,
    private window: Window
  ) {
    this.ApiHost = "http://192.168.30.204:8049";
  }

  routeBack(checkUrls: Array<string>, redirectUrl: string): void {
    if (!(checkUrls && checkUrls.length > 0) && !redirectUrl) {
      this.window.history.back();
    } else if (!(checkUrls && checkUrls.length > 0) && redirectUrl) {
      this.router.navigate([redirectUrl]);
    } else {
      var isExist = false;
      checkUrls.forEach((url) => {
        isExist = ActiveRouters.nativeRoutes.indexOf(url) > -1
      });
      if (isExist) {
        this.router.navigate([redirectUrl]);
      } else {
        this.window.history.back();
      }
    }
  }

  getStorageAjaxObservable(key: string, ajaxObservable: Observable<any>): Observable<any> {

    let values = localStorage.getItem(key);
    let observable = (function (value) {
      if (value) {
        let results = JSON.parse(value);
        return new Observable((subscriber: any) => {
          subscriber.next(results);
        });
      }

    } (values));
    if (observable) {
      return observable.merge(ajaxObservable);
    }
    return ajaxObservable;

  }

}
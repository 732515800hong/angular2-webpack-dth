import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { CommonService } from '../../core';

@Injectable()
export class CarouselService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  private storageKey = "adlist";

  constructor(
    private http: Http,
    private commonService: CommonService
  ) {

  }

  getAdList(ad: any) {
    let options = new RequestOptions({ headers: this.headers });
    let body = new URLSearchParams();
    Object.keys(ad).forEach(key => {
      body.set(key, ad[key]);
    });
    //var results = localStorage.getItem
    var url = `${this.commonService.ApiHost}/api/product/GetAdList`;
    var observable = this.http.post(url, body.toString(), options)
      .map((res: Response) => {
        let result = res.json();
        if (result.code == 1) {
          localStorage.setItem(this.storageKey, JSON.stringify(result));
        }
        return result;
      });

    var keys = `${this.storageKey}-${body.toString()}`;
    return this.commonService.getStorageAjaxObservable(keys, observable);

  }

}
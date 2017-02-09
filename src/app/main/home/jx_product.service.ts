import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../core';

@Injectable()
export class JxProductService {

  private storageKey = "jx_product";
  private headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(
    private http: Http,
    private commonService: CommonService
  ) {

  }

  getJxProduct(): Observable<any> {

    let url = this.commonService.ApiHost + '/api/product/GetHomeProduct';

    var ob = this.http.post(url, "", { headers: this.headers })
      .map((res: Response) => {
        let result = res.json();
        if (result.code == 1) {
          localStorage.setItem(this.storageKey, JSON.stringify(result));
        }
        return result;
      });
    return this.commonService.getStorageAjaxObservable(this.storageKey, ob);

  }

}
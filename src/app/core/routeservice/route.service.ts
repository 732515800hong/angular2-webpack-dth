import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RouteService implements CanActivateChild {

  nativeRoutes: Array<string> = [];

  constructor() { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    var url = this.getCurrentPath(route);
    if (this.nativeRoutes.indexOf(url) == -1) {
      this.nativeRoutes.push(url);
    }
    return true;
  }

  getCurrentPath(route: ActivatedRouteSnapshot): string {
    if (route.url.toString()) {
      return this.getCurrentPath(route.parent) + "/" + route.url.toString();
    } else {
      return "";
    }
  }

}
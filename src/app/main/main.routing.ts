import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainProductComponent } from './product/product.component';
import { RouteService } from '../core';


const routes: Routes = [
  {
    path: 'main',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product', component: MainProductComponent }
    ],
    canActivateChild: [RouteService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
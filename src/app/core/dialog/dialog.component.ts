import { Component, OnInit, ComponentRef, HostListener } from '@angular/core';
import { DialogConfig, DialogBtn } from './dialog.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dialog',
  templateUrl: `
    <div [ngClass]="boxClass" *ngIf="config">
      <div [hidden]="!config.shade" class="layui-m-layershade" (tap)="onDestroy()"></div>
      <div class="layui-m-layermain">
        <div class="layui-m-layersection">
          <div [ngClass]="childClass">
            <ng-container *ngIf="!config.loading">
              <h3 *ngIf="config.title">{{config.title}}</h3>
              <div class="layui-m-layercont">{{config.content}}</div>
              <div class="layui-m-layerbtn" *ngIf="config.btns && config.btns.length > 0">
                <span *ngFor="let btn of config.btns; let i = index;" (tap)="onBtnClick($event, i)">{{btn.text}}</span>
              </div>
            </ng-container>
            <ng-container *ngIf="config.loading">
              <div class="loading-box">
                <div class="loading0">loading</div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public config: DialogConfig;
  public componentRef: ComponentRef<DialogComponent>;
  boxClass: string[];
  childClass: string[];

  constructor() {
    this.config = { type: 0, title: '', content: '' };
    this.boxClass = ['layui-m-layer'];
  }

  ngOnInit() {
    if (!this.componentRef) {
      return Error("dialog component componentRef is undefined");
    }
    if (typeof this.config.type === "undefined") this.config.type = 0;
    if (typeof this.config.shade === "undefined") this.config.shade = true;
    this.boxClass = ['layui-m-layer', 'layui-m-layer' + this.config.type];

    if (this.config.skin === 'msg') this.config.shade = false;
    this.childClass = [];
    if (this.config.loading) {
      if (this.config.shade) {
        this.childClass = ['layui-m-layerchild-loadingshade', 'layui-m-anim-scale'];
      } else {
        this.childClass = ['layui-m-layerchild-loading' + this.config.type, 'layui-m-anim-scale'];
      }
    } else {
      this.childClass = ['layui-m-layerchild', (this.config.skin ? 'layui-m-layer-' + this.config.skin + ' ' : ''), 'layui-m-anim-scale'];
    }
    if (this.childClass.indexOf('layer-m-layershow') == -1) {
      this.childClass.push('layer-m-layershow');
    }
  }

  onBtnClick($event: Event, index: number) {
    (event || window.event).stopPropagation();
    if (this.config.btns && this.config.btns[index]) {
      let btn = this.config.btns[index];
      if (btn.clickEvent && btn.clickEvent instanceof Subject) {
        btn.clickEvent.next(this.componentRef);
      } else {
        this.onDestroy();
      }
    } else {
      this.onDestroy();
    }
  }

  onDestroy() {
    this.componentRef.destroy();
  }

}
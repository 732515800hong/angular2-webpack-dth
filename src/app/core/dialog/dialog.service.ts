import { Injectable, ComponentFactoryResolver, ComponentRef, Injector, ViewContainerRef, EventEmitter } from '@angular/core';
import { DialogConfig, DialogBtn } from './dialog.model';
import { CommonService } from '../common/common';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {

  private cmpRef: ComponentRef<DialogComponent>;
  private dialogConfig: DialogConfig;
  viewContainerRef: ViewContainerRef;
  destroyComponent: EventEmitter<any> = new EventEmitter();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private commonService: CommonService
  ) {
    this.viewContainerRef = commonService.AppComponentRef;
  }

  createComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    this.cmpRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, this.injector);
  }

  message(content: string): void {
    this.dialogConfig = {
      title: '',
      content: content,
      type: 0
    }
    this.createComponent();
    this.dialogComponentInit();
  }

  open(dialogConfig: DialogConfig) {
    this.dialogConfig = dialogConfig;
    this.createComponent();
    this.dialogComponentInit();
  }

  loading(shade: boolean) {
    this.dialogConfig = {
      title: '',
      content: '',
      loading: true,
      shade: shade
    };
    this.createComponent();
    this.dialogComponentInit();
  }

  close() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  dialogComponentInit() {
    this.cmpRef.instance.config = this.dialogConfig;
    this.cmpRef.instance.componentRef = this.cmpRef;
  }

}
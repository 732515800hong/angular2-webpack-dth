import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DialogService } from '../../core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title: string;
  carousels: Array<any>;
  completed: Subject<any> = new Subject();
  load: number = 1;
  loaded: number = 0;
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private dialogService: DialogService
  ) {
    //this.dialogService.loading(true);
    this.title = '精选';
    this.completed.subscribe(() => {
      this.loaded++
      if (this.loaded == this.load) {
        this.completed.complete();
      }
    }, (error: any) => {
      console.log(error);
    }, () => {
      //this.dialogService.close();
    })
  }

  routeLinkNative($event: Event) {
    this.router.navigate(['/main/product']);
  }

  childComleted(result: any) {
    if (result.status === 'fail') {
      this.completed.error(result.message);
    } else {
      this.completed.next();
    }
  }

  onHeaderClick() {

    //this.dialogService.loading(false);
    //this.dialogService.message("弹出层测试");

  }

}
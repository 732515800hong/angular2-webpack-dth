import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent],
  providers: [DialogService],
  entryComponents: [DialogComponent]
})
export class DialogModule { }

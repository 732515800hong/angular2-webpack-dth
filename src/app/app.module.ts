import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, SharedModule, CoreModule, MainModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

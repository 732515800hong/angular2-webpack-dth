
import './assets/css/layer.scss';
import 'hammerjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

/**
 * @import 根模块
 */
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
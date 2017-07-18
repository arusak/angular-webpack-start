import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppModule} from "./app/app.module";
import {tmEnvConfig} from "./config/env.config";

import './styles/styles.css';

if (tmEnvConfig.buildProfile === 'production' || tmEnvConfig.buildProfile === 'staging') {
  enableProdMode();
}

console.log('Bootstrapping application');
platformBrowserDynamic().bootstrapModule(AppModule);

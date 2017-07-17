import {platformBrowser} from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import {tmEnvConfig} from './config/env.config';

import './styles/styles.css';
import {AppModuleNgFactory} from '../aot/src/app/app.module.ngfactory';

if (tmEnvConfig.buildProfile === 'production' || tmEnvConfig.buildProfile === 'staging') {
  enableProdMode();
}

console.log('Bootstrapping application');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

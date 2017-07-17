import {tmEnvConfig} from "./config/env.config";

import 'core-js/client/shim';
require('zone.js/dist/zone');

if (tmEnvConfig.buildProfile === 'production') {
  // Production
} else {
  // Development and test
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

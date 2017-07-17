import {Injectable} from "@angular/core";
import {LoggerConfig} from "../models/logger-config";
import {tmLoggerConfig} from "../../../config/logger.config";
import moment = require("moment");

@Injectable()
export class ConfigService {
  private loggerConfig: LoggerConfig;

  constructor() {
    this.loggerConfig = tmLoggerConfig;
    moment.locale('ru');
  }

  getLoggerConfig() {
    return this.loggerConfig;
  }

  getAppTitle() {
    return 'Angular 💕 Webpack';
  }
}

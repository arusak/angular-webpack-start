import {Injectable} from "@angular/core";
import {LoggerConfig} from "../models/logger-config";
import {tmLoggerConfig} from "../../../config/logger.config";


@Injectable()
export class ConfigService {
  private loggerConfig: LoggerConfig;

  constructor() {
    this.loggerConfig = tmLoggerConfig;
  }

  getLoggerConfig() {
    return this.loggerConfig;
  }

  getAppTitle() {
    return 'Angular 💕 Webpack';
  }
}

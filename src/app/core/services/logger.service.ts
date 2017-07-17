import {Injectable} from "@angular/core";
import {ConfigService} from "./config.service";
import {LoggerConfig} from "../models/logger-config";
import * as moment from "moment";
import {Request, RequestMethod} from "@angular/http";

@Injectable()
export class Logger {
  private options: LoggerConfig;

  constructor(private config: ConfigService) {
    this.options = config.getLoggerConfig();
  }

  public request(request: Request): void {
    let methodName: string;
    let url: string;

    if (request instanceof Request) {
      methodName = RequestMethod[request.method];
      url = request.url;
    } else {
      methodName = 'http';
      url = request;
    }

    if (this.options.showRequests) {
      this.log(`${methodName}> ${url}`);
    }
  }

  public redirect(url: string | string[], cause: string): void {
    if (this.options.showRedirects) {
      if (Array.isArray(url)) {
        url = url.join('/')
      }
      this.log(`~~~~> ${url} (${cause})`);
    }
  }

  public component(name: string, ...messages: any[]) {
    if (this.options.showComponents.includes(name)) {
      this.colorLog('#113ada', name, messages.join(', '));
    }
  }

  public service(name: string, ...messages: any[]) {
    if (this.options.showServices.includes(name)) {
      this.colorLog('#b300da', name, messages.join(', '));
    }
  }

  private colorLog(color: string, name: string, text: string) {
    let timestamp = moment().format('HH:mm:ss.SSS');
    console.log(`%c${timestamp} %c${name}: %c${text}`, 'color: #ccc', `color: ${color}`, 'color: inherit');
  }

  public log(...messages: any[]): void {
    let timestamp = moment().format('HH:mm:ss.SSS');
    messages.unshift(timestamp);
    console.log.apply(this, messages);
  }

  public error(...messages: any[]): void {
    let timestamp = moment().format('HH:mm:ss.SSS');
    messages.unshift(timestamp);
    console.error.apply(this, messages);
  }

  public dump(o: any) {
    this.log(JSON.stringify(o));
  }
}

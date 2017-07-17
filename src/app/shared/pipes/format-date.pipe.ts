import {Pipe, PipeTransform} from "@angular/core";
import {Moment} from "moment";

@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {
  transform(date: Moment, format?: string): string {
    if (!format) {
      format = 'D MMMM YYYY';
    }
    return date && date.format(format);
  }
}

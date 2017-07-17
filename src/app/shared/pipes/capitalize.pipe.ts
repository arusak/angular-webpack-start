import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeStatus'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    return value? value.filter((item) => item.status.toLowerCase() == args[0].toLowerCase() || args[0] == 'All') :[];
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    let key = args[0] || "";
    if (key == undefined) { 
      key = 'id';
    }
    
    return value.sort((a: any, b: any) => a[key] - b[key]);
  }

}

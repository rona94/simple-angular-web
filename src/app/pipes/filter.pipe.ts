import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    const by = args[0] || "";

    // let newVal = JSON.parse(JSON.stringify(value)); // parse to prevent edit original array
    let newVal: any = [];

    value.forEach((val: any, index: any) => {
      Object.keys(val).forEach((key) => { 
        if (
          val[key].toString().indexOf(by.trim()) !== -1 ||
          by.trim() == ''
        ) {
          // value.splice(index, 1);
          if (newVal.indexOf(val) == -1) { 
            newVal.push(val);
          }
        }
      });
    });

    return newVal;
  }

}
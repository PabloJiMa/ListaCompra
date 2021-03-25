import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fecha'
})

export class FechaPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
     ///MMM/dd/yyyy 
     return super.transform(value, "dd/MM/yyyy");
  }
}
import {Pipe, PipeTransform} from '@angular/core';
 
import * as moment from 'moment';


@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date|moment.Moment, args: string[]): any {

  	if (!value) return value;
    const age = moment().diff(value, 'years');
    return isNaN(age)?"NA":age;
  	
  }
}
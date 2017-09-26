import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(content: any, args?: any): any {
    var reg = /<[^>]*>|<\/[^>]*>/gm;
    content=content.replace(reg,"");
    return content.slice(0,266)+"...";
  }

}

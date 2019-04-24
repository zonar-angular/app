import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterlist'
})
export class FilterlistPipe implements PipeTransform {
  transform(dataSource: Array<any>, skuSearch: number, priceSearch: number, descSearch: string) {
    if (dataSource && dataSource.length) {
      return dataSource.filter( p => {
        if (skuSearch && p.sku.indexOf(skuSearch) === -1) return false;
        if (priceSearch && p.price.indexOf(priceSearch) === -1) return false;
        if (descSearch && p.description.toLowerCase().indexOf(descSearch.toLowerCase()) === -1) return false;
        return true;
      })
    } else {
      return dataSource;
    }
  }
}
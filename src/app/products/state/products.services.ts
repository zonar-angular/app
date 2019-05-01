import { Injectable } from '@angular/core';
import { ProductStore } from './products.store';
import { ProductsService } from '../products.service';
import { Product } from '../../models/product.model';
import { tap } from 'rxjs/operators';
const util = require('util');

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor( private prodStore: ProductStore, private prodService: ProductsService ) {}

  getProducts() {
    return this.prodService.getProducts().pipe(
      tap( result => {
        console.log(util.inspect(result, {showHidden: false, depth: null}))
        let dataArr: Product[] = [];
        for (let obj in result) {
          dataArr.push(result[obj]);
        }
        console.log(util.inspect(dataArr, {showHidden: false, depth: null}))
        this.prodStore.add(dataArr)
      })
    )
  }
}
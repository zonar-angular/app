import { Injectable } from '@angular/core';
import { ProductStore } from './products.store';
import { ProductsService } from '../products.service';
import { Product } from '../../models/product.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor( private prodStore: ProductStore, private prodService: ProductsService ) {}

  getProducts() {
    return this.prodService.getProducts().pipe(
      tap( result => {
        let dataArr: Product[] = [];
        for (let obj in result) {
          dataArr.push(result[obj]);
        }
        this.prodStore.add(dataArr);
        //return dataArr;
      })
    )
  }

  addProduct(payload) {
    return this.prodService.addProduct(payload).pipe(
      tap( result => {
        console.log({result});
        this.prodStore.add(result)
      })
    )
  }

  deleteProduct(id) {
    return this.prodService.deleteProduct(id).pipe(
      tap( result => {
        this.prodStore.remove(id);
      })
    )
  }
}
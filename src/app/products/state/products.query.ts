import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductState, ProductStore } from './products.store';
import { Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState, Product> {
  constructor(protected store: ProductStore) {
    super(store);
  }
}

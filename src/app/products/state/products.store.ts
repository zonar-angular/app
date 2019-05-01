import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Product } from '../../models/product.model';

export interface ProductState extends EntityState<Product> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'products' })
export class ProductStore extends EntityStore<ProductState, Product> {
  constructor() {
    super();
  }
}
import { Product } from '../../models/product.model';

export class AddProduct {
  static readonly type = '[App] Add Product';
  constructor(public payload: Product) { }
}

export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public id: number) { }
}

export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public payload: Product) { }
}
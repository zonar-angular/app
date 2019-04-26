import { Action } from '@ngrx/store';
import { Product } from '../../models/product.model';

export enum ProductActionTypes {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  AddProduct = '[Product] Add Product',
  AddProductSuccess = '[Product] Add Product Success',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  EditProduct = '[Product] Edit Product',
  EditProductSuccess = '[Product] Edit Product Success',
}

export class GetProducts implements Action {
  readonly type = ProductActionTypes.GetProducts;
}
export class GetProductsSuccess implements Action {
  readonly type = ProductActionTypes.GetProductsSuccess;
  constructor( public payload: Product[] ) {}
}

export class AddProduct implements Action {
  readonly type = ProductActionTypes.AddProduct;
  constructor( public payload: Product ) {}
}

export class AddProductSuccess implements Action {
  readonly type = ProductActionTypes.AddProductSuccess;
  constructor( public payload: Product ) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;
  constructor( public payload: string ) { }
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductActionTypes.DeleteProductSuccess;
}

export class EditProduct implements Action {
  readonly type = ProductActionTypes.EditProduct;
  constructor( public payload: Product ) { }
}

export class EditProductSuccess implements Action {
  readonly type = ProductActionTypes.EditProductSuccess;
  constructor( public payload: Product ) {}
}

export type ProductActions = GetProducts | AddProduct | DeleteProduct | EditProduct | GetProductsSuccess | DeleteProductSuccess | AddProductSuccess | EditProductSuccess;
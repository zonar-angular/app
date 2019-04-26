import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, merge } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ProductsService } from '../../products/products.service';
import * as prodActions from '../actions/products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private prodService: ProductsService,
  ) { }

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType<prodActions.GetProducts>(prodActions.ProductActionTypes.GetProducts),
    mergeMap( () => this.prodService.getProducts().pipe(
      map( products => ( new prodActions.GetProductsSuccess(products) ) )
    ))
  );

  @Effect()
  addProduct$: Observable<Action> = this.actions$.pipe(
    ofType<prodActions.AddProduct>(prodActions.ProductActionTypes.AddProduct),
    mergeMap( action => this.prodService.addProduct(action.payload).pipe(
      map( product => ( new prodActions.AddProductSuccess(product) ))
    ))
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType<prodActions.DeleteProduct>(prodActions.ProductActionTypes.DeleteProduct),
    mergeMap( action => this.prodService.deleteProduct(action.payload).pipe(
      map( product => ( new prodActions.DeleteProductSuccess() ))
    ))
  );

  @Effect()
  editProduct$: Observable<Action> = this.actions$.pipe(
    ofType<prodActions.EditProduct>(prodActions.ProductActionTypes.EditProduct),
    mergeMap( action => this.prodService.updateProduct(action.payload).pipe(
      map( product => ( new prodActions.EditProductSuccess(product) ))
    ))
  );
}
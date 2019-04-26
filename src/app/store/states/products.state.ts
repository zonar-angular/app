import { State, StateContext, Action, Selector, createSelector } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { Product } from '../../models/product.model';
import { AddProduct, DeleteProduct, EditProduct, GetProducts } from '../actions/product.actions';
import { ProductsService } from '../../products/products.service';
import { tap } from 'rxjs/operators';

export class ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  }
})

export class ProductState {
  constructor(private prodService: ProductsService) { }

  @Selector()
  static getProductList(state: ProductStateModel) {
    return state.products;
  }

  @Action(GetProducts)
  getProds( { setState }: StateContext<ProductStateModel> ) {
    return this.prodService.getProducts().pipe(
      tap( result => {
        let dataArr = [];
        for (let prod in result) {
          dataArr.push(result[prod]);
        }
        setState( patch({
          products: append(dataArr)
        }));
      })
    );
  }

  @Action(AddProduct)
  addProd(
    { setState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    return this.prodService.addProduct(payload).pipe(
      tap( result => {
        setState( patch({
          products: append([result])
        }));
      })
    );
  }

  @Action(DeleteProduct)
  deleteProd(
    { setState }: StateContext<ProductStateModel>,
    { id }: DeleteProduct
  ) {
    return this.prodService.deleteProduct(id).pipe(
      tap( result => {
        setState( patch({
          products: removeItem<Product>( prod => prod.id === id )
        }));
      })
    );
  }

  @Action(EditProduct)
  editProd(
    { setState }: StateContext<ProductStateModel>,
    { payload }: EditProduct
  ) {
    return this.prodService.updateProduct(payload).pipe(
      tap( result => {
        setState( patch({
          products: updateItem<Product>( prod => prod.id === payload.id, result )
        }));
      })
    );
  }
}
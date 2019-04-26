import { ProductActionTypes, ProductActions } from '../actions/products.actions';
import { IAppState } from '../../models/app.state';

export const initialState: IAppState = {
  products: []
}

export const productReducer = (state = initialState, action: ProductActions): IAppState => {
  
  switch(action.type) {
    case ProductActionTypes.GetProductsSuccess:
      let dataArr = [];
      for(let prod in action.payload) {
        dataArr.push(action.payload[prod]);
      }
      return {
        ...state,
        products: dataArr
      };

    case ProductActionTypes.AddProduct:
      return {
        ...state,
        products: state.products ? [...state.products, action.payload] : [action.payload]
      }

    case ProductActionTypes.DeleteProduct:
      let filteredProds = state.products.filter( r => r.id !== action.payload);
      return {
        ...state,
        products: filteredProds
      }

    case ProductActionTypes.EditProduct:
      let editProds = state.products.map( prod => prod.id === action.payload.id ? action.payload : prod );
      return {
        ...state,
        products: editProds
      }

    default:
      return state;
  }
}
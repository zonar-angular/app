import { Product } from './product.model';

export interface IAppState {
  readonly products: Product[];
}
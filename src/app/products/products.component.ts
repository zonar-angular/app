import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatTable, MatSort, MatPaginator } from '@angular/material';
import { Product } from '../models/product.model';
import { priceValidator } from '../validators/price.validator';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';
import { ProductState } from '../store/states/products.state';
import { AddProduct, GetProducts, DeleteProduct, EditProduct} from '../store/actions/product.actions';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Select(ProductState.getProductList) products: Observable<Product[]>;

  //*****************
  // TABLE */

  // displayedColumns = ['sku', 'price', 'description', 'edit', 'delete'];
  // dataSource = new MatTableDataSource<Product>();

  // skuFilter: FormControl = new FormControl();
  // priceFilter: FormControl = new FormControl();
  // filterValues: any = { sku: '', price: '' } 

  // @ViewChild(MatTable) table: MatTable<any>;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ***************

  crudForm: FormGroup;
  showForm: boolean = false;
  
  constructor( private store: Store ) {
    this.crudForm = this.createFormGroup();
  }

  /*
  ngOnInit()

  When component initializes either on refresh or path change
  subscribes to data returned from service. Converts returned
  opbject to array for Angular parsing. Updates state products$
  with data.

  Parameters: Nothing
  */
  ngOnInit() {
    this.store.dispatch( new GetProducts() );
  }

  //******** TABLE ********/

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.products.subscribe( prod => this.dataSource.data = prod as Product[] );

  //   this.skuFilter.valueChanges.subscribe( val => {
  //     this.filterValues['sku'] = val;
  //     this.dataSource.filter = JSON.stringify(this.filterValues);
  //   });
  //   this.priceFilter.valueChanges.subscribe( val => {
  //     this.filterValues['price'] = val;
  //     this.dataSource.filter = JSON.stringify(this.filterValues);
  //   });

  //   this.dataSource.filterPredicate = this.createFilter();
  // }

  createFilter() {
    let filterFunction = function(data, filter) : boolean {
      let searchTerms = JSON.parse(filter);
      if (!searchTerms.sku) searchTerms.sku = '';
      if (!searchTerms.price) searchTerms.price = '';

      return data.sku.toString().indexOf(searchTerms.sku) !== -1 && data.price.toString().indexOf(searchTerms.price) !== -1;
    }
    return filterFunction;
  }

  // **********************

  /*
  gets

  The three gets below are used by HTML to check if user touched
  form controls

  Parameters: Nothing
  Returns: Form control data
  */
  get sku() { return this.crudForm.get('sku') }
  get description() { return this.crudForm.get('description') }
  get price() { return this.crudForm.get('price') }

  /*
  addOrEdit()

  Routes user to correct http request based on if product as ID.
  If ID, that means it's a product that exists and needs to be
  edited/updated.

  Parameters: Nothing
  Returns: Nothing
  */
  addOrEdit() {
    if (this.crudForm.value.id) this.editProduct(this.crudForm.value);
    else this.addProduct(this.crudForm.value);
  }

  /*
  addProduct()

  Creates new product and sends it to service. Once new product
  added, updates state with new product, closes and resets form
  for next use.

  Parameters: Form input
  Returns: Nothing
  */
  addProduct(newProduct) {
    const result: Product = Object.assign({}, newProduct);
    this.store.dispatch( new AddProduct(result) );

    this.showForm = false;
    this.crudForm.reset();
  }

  /*
  deleteProduct(id)

  On window confirm, sends product to delete to service. Updates
  state by deleting product from array.

  Parameters: ProductID
  Returns: Nothing
  */
  deleteProduct(id) {
    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT?')) {
      this.store.dispatch( new DeleteProduct(id) );
    } else return;

  }

  /*
  putInForm(prod)

  Puts product data user wants to edit into form

  Parameters: Product
  Returns: Nothing
  */
  putInForm(prod) {
    this.crudForm.setValue({
      id: prod.id,
      sku: prod.sku,
      description: prod.description,
      price: prod.price,
    });
  }

  /*
  editProduct(prod)

  Sends product to update to service. Once updated, updates state
  with updated product. Closes form and resets for next use.

  Parameters: 
  Returns: 
  */
  editProduct(prod) {
    this.store.dispatch( new EditProduct(prod) );
  
    this.showForm = false;
    this.crudForm.reset();
  }

  /*
  createFormGroup()

  Creates a new form with validators.

  Parameters: None
  Returns: Form
  */
  createFormGroup() {
    return new FormGroup({
      id: new FormControl(null),
      sku: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        priceValidator,
      ]),
    });
  }

}

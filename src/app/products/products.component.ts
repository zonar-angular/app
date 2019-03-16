import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { priceValidator } from '../validators/price.validator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Array<Product>;
  crudForm: FormGroup;
  showForm: boolean = false;

  constructor(
    private productsService: ProductsService,
  ) {
    this.crudForm = this.createFormGroup();
  }

  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe( data => {
        let dataArr = [];
        for (let obj in data) {
          dataArr.push(data[obj]);
        }

        this.products$ = dataArr;
      });
  }

  get sku() { return this.crudForm.get('sku') }
  get description() { return this.crudForm.get('description') }
  get price() { return this.crudForm.get('price') }

  addOrEdit() {
    if (this.crudForm.value.id) {
      this.editProduct(this.crudForm.value);
    }
    else this.addProduct(this.crudForm.value);
  }

  addProduct(newProduct) {
    const result: Product = Object.assign({}, newProduct);

    this.productsService
      .addProduct(result)
      .subscribe(data => {
        this.products$ = [...this.products$, data];
      });

    this.showForm = false;
    this.crudForm.reset();
  }

  deleteProduct(id) {
    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT?')) {
      this.productsService
      .deleteProduct(id)
      .subscribe( data => {
        let clone = [...this.products$];
        const index = clone.findIndex( prod => prod.id === id);
        clone.splice(index, 1);
        this.products$ = clone;
      });
    } else return;

  }

  putInForm(prod) {
    this.crudForm.setValue({
      id: prod.id,
      sku: prod.sku,
      description: prod.description,
      price: prod.price,
    });
  }

  editProduct(prod) {
    this.productsService
      .updateProduct(prod)
      .subscribe( data => {
        let clone = [...this.products$];
        const index = clone.findIndex( prod => prod.id === data.id);
        clone[index] = data;
        console.log(clone);
        this.products$ = clone;
      });
  
    this.showForm = false;
    this.crudForm.reset();
  }

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

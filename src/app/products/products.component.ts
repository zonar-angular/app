import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Object;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe( data => {
        console.log(data);
        let dataArr = [];
        for (let obj in data) {
          dataArr.push(data[obj]);
        }

        this.products$ = dataArr;
        console.log(this.products$);
      });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*
  getProducts()

  Calls server's GET route for all products

  Parameters: Nothing
  Returns: All products
  */
  getProducts() {
    return this.http.get<Product[]>(`${this.API}/products`);
  }

  /*
  addProduct(product)

  Calls server's POST route to save new product

  Parameters: New product
  Returns: New Product
  */
  addProduct(product) {
    const sku = product.sku, 
          description = product.description, 
          price = product.price;
    
    return this.http.post<Product>(`${this.API}/products`, {
      sku,
      description,
      price,
    });
  }

  /*
  deleteProduct(id)

  Calls server's DELETE route to delete the product from the server

  Parameters: Product ID
  Returns: Nothing
  */
  deleteProduct(id) {
    return this.http.delete<Product>(`${this.API}/products/${id}`);
  }

  /*
  updateProduct(product)

  Calls server's PUT route to reassign products properties based on incoming data

  Parameters: Updated product
  Returns: Updated product
  */
  updateProduct<Product>(product) {
    const sku = product.sku, 
          description = product.description, 
          price = product.price,
          id = product.id;

    return this.http.put<Product>(`${this.API}/products/${id}`, {
      sku,
      description,
      price,
    });
  }
}

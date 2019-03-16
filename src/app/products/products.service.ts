import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${API}/products`);
  }

  addProduct(product) {
    const sku = product.sku, 
          description = product.description, 
          price = product.price;
    
    return this.http.post<Product>(`${API}/products`, {
      sku,
      description,
      price,
    });
  }

  deleteProduct(id) {
    return this.http.delete(`${API}/products/${id}`);
  }

  updateProduct(product) {
    const sku = product.sku, 
          description = product.description, 
          price = product.price,
          id = product.id;

    return this.http.put<Product>(`${API}/products/${id}`, {
      sku,
      description,
      price,
    });
  }
}

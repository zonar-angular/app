import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let testControl: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService,
      ],
    });

    httpClient = TestBed.get(HttpClient);
    testControl = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
  });

  afterEach(() => {
    testControl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get Products', () => {
    let expected: Product[];

    beforeEach( () => {
      service = TestBed.get(ProductsService);
      expected = [
        { id: 1, sku: 123456, description: "Hello", price: 30},
        { id: 2, sku: 1234567, description: 'World', price: 12.34}
      ] as Product[];
    });

    it('should return products', () => {
      service
        .getProducts()
        .subscribe( prods => 
          expect(prods).toEqual(expected, 'should return products'),
          fail
        );
      const req = testControl.expectOne(`${service.API}/products`);
      expect(req.request.method).toEqual('GET');

      req.flush(expected);
    });
  });

  describe('Post Product', () => {
    it('should add a new product to the list', () => {
      const newProd = {
        sku: 654321,
        description: 'Hello World',
        price: 34.5,
      };

      service
        .addProduct(newProd)
        .subscribe( data => 
          expect(data).toEqual(newProd, 'should return the new prod'),
          fail
        );
      
      const req = testControl.expectOne(`${service.API}/products`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newProd);

      const expectedResponse = new HttpResponse({
        status: 200, 
        statusText: 'OK', 
        body: newProd,
      });
      req.event(expectedResponse);
    });
  });

  describe('Delete Product', () => {
    const expected = [
      { id: 1, sku: 123456, description: "Hello", price: 30},
    ];

    it('should delete product from db', () => {
      service
        .deleteProduct(2)
        .subscribe( data => 
          expect(data).toEqual(expected, 'should delete the product'),
          fail
        );

      const req = testControl.expectOne(`${service.API}/products/2`);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('Update Product', () => {
    it ('should updated a product', () => {
      const updated: Product = {
        id: 1,
        sku: 123456,
        description: "Hello",
        price: 30
      };

      service
        .updateProduct(updated)
        .subscribe( data => 
          expect(data).toEqual(updated, 'should update the product'),
          fail
        );

      const req = testControl.expectOne(`${service.API}/products/1`);
      expect(req.request.method).toEqual('PUT');
      console.log(req.request.body);
      expect(req.request.body).toEqual({
        sku: 123456,
        description: "Hello",
        price: 30
      });

      const expectedResponse = new HttpResponse({
        status: 200, 
        statusText: 'OK', 
        body: updated,
      });
      req.event(expectedResponse);
    });
  });

});

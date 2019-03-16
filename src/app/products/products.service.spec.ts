import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientModule, HttpEvent, HttpEventType } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
  });

  it('should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

});

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import {ProductsService} from '@yaari/services/products/products.service';

describe('SupplierRegistrationService', () => {
  let httpTestingController: HttpTestingController;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    productsService = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });
});

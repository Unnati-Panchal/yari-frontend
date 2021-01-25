import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import {SupplierRegistrationService} from '~auth/registration/services/supplier-registration.service';
import {ApiService} from '@yaari/services/api/api.service';

describe('SupplierRegistrationService', () => {
  let httpTestingController: HttpTestingController;
  let registrationService: SupplierRegistrationService;
  let apiService: ApiService;

  let getRequestSpy: jest.SpyInstance;
  let patchRequestSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SupplierRegistrationService,
        {
          provide: ApiService,
          useValue: {
            get: () => {},
            post: () => {},
            put: () => {},
            patch: () => {}
          }
        }
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    apiService = TestBed.inject(ApiService);
    registrationService = TestBed.inject(SupplierRegistrationService);

    getRequestSpy = jest.spyOn(apiService, 'get');
    patchRequestSpy = jest.spyOn(apiService, 'patch');
  });

  it('should be created', () => {
    expect(registrationService).toBeTruthy();
  });
});

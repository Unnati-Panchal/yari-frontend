import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMPTY } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SupplierCatalogProductDetailsComponent } from './supplier-catalog-product-details.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('SupplierCatalogProductDetailsComponent', () => {
  let component: SupplierCatalogProductDetailsComponent;
  let fixture: ComponentFixture<SupplierCatalogProductDetailsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierCatalogProductDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => jest.fn().mockReturnValue(EMPTY)
              }
            }
          }
        },
        { provide: Router, useValue: {} },
        { provide: Location, useValue: {} },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCatalogProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

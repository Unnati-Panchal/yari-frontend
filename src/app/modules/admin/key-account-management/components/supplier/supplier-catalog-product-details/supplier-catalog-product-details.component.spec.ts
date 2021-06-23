import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCatalogProductDetailsComponent } from './supplier-catalog-product-details.component';

describe('SupplierCatalogProductDetailsComponent', () => {
  let component: SupplierCatalogProductDetailsComponent;
  let fixture: ComponentFixture<SupplierCatalogProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCatalogProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCatalogProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

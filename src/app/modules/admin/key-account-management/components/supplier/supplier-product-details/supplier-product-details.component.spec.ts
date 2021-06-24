import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductDetailsComponent } from './supplier-product-details.component';

describe('SupplierProductDetailsComponent', () => {
  let component: SupplierProductDetailsComponent;
  let fixture: ComponentFixture<SupplierProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

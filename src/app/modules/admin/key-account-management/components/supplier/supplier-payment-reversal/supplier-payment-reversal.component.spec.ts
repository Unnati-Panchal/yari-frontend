import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaymentReversalComponent } from './supplier-payment-reversal.component';

describe('SupplierPaymentReversalComponent', () => {
  let component: SupplierPaymentReversalComponent;
  let fixture: ComponentFixture<SupplierPaymentReversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierPaymentReversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPaymentReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

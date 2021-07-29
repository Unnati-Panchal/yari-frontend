import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerPaymentReversalComponent } from './reseller-payment-reversal.component';

describe('ResellerPaymentReversalComponent', () => {
  let component: ResellerPaymentReversalComponent;
  let fixture: ComponentFixture<ResellerPaymentReversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellerPaymentReversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerPaymentReversalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

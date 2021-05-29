import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingManagementComponent } from './pricing-management.component';

describe('PricingManagementComponent', () => {
  let component: PricingManagementComponent;
  let fixture: ComponentFixture<PricingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

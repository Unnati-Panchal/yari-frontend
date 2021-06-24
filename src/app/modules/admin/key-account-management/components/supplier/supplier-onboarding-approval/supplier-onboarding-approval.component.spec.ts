import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOnboardingApprovalComponent } from './supplier-onboarding-approval.component';

describe('SupplierOnboardingApprovalComponent', () => {
  let component: SupplierOnboardingApprovalComponent;
  let fixture: ComponentFixture<SupplierOnboardingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierOnboardingApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOnboardingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

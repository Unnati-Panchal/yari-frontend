import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@yaari/shared.module';

import {KeyAccountManagementComponent} from '~admin/key-account-management/components/key-account-management/key-account-management.component';
import {KeyAccountManagementRoutingModule} from '~admin/key-account-management/key-account-management-routing.module';
import {ResellerComplaintsComponent} from '~admin/key-account-management/components/reseller/reseller-complaints/reseller-complaints.component';
import {SupplierComplaintsComponent} from '~admin/key-account-management/components/supplier/supplier-complaints/supplier-complaints.component';
import {SupplierNewRegistrationComponent} from '~admin/key-account-management/components/supplier/supplier-new-registration/supplier-new-registration.component';
import {SupplierOnboardingApprovalComponent} from '~admin/key-account-management/components/supplier/supplier-onboarding-approval/supplier-onboarding-approval.component';
import {SupplierDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-details/supplier-details.component';
import {SupplierProductDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-product-details/supplier-product-details.component';

@NgModule({
  declarations: [
    KeyAccountManagementComponent,
    ResellerComplaintsComponent,
    SupplierComplaintsComponent,
    SupplierNewRegistrationComponent,
    SupplierOnboardingApprovalComponent,
    SupplierDetailsComponent,
    SupplierProductDetailsComponent
  ],
  imports: [
    CommonModule,
    KeyAccountManagementRoutingModule,
    SharedModule,
  ]
})
export class KeyAccountManagementModule { }

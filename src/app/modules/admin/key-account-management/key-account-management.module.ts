import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';

import {SharedModule} from '@yaari/shared.module';
import {KeyAccountManagementRoutingModule} from '~admin/key-account-management/key-account-management-routing.module';
import {ResellerComplaintsComponent} from '~admin/key-account-management/components/reseller/reseller-complaints/reseller-complaints.component';
import {SupplierComplaintsComponent} from '~admin/key-account-management/components/supplier/supplier-complaints/supplier-complaints.component';
import {SupplierNewRegistrationComponent} from '~admin/key-account-management/components/supplier/supplier-new-registration/supplier-new-registration.component';
import {SupplierOnboardingApprovalComponent} from '~admin/key-account-management/components/supplier/supplier-onboarding-approval/supplier-onboarding-approval.component';
import {SupplierDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-details/supplier-details.component';
import {SupplierProductDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-product-details/supplier-product-details.component';
import {DashboardComponent} from '~admin/key-account-management/components/dashboard/dashboard.component';
import {SupplierListComponent} from './components/supplier/supplier-list/supplier-list.component';
import {ResellerListComponent} from './components/reseller/reseller-list/reseller-list.component';
import {ResellerDetailsComponent} from './components/reseller/reseller-details/reseller-details.component';
import {ResellerPaymentReversalComponent} from './components/reseller/reseller-payment-reversal/reseller-payment-reversal.component';
import {SupplierPaymentReversalComponent} from './components/supplier/supplier-payment-reversal/supplier-payment-reversal.component';

@NgModule({
  declarations: [
    ResellerComplaintsComponent,
    SupplierComplaintsComponent,
    SupplierNewRegistrationComponent,
    SupplierOnboardingApprovalComponent,
    SupplierDetailsComponent,
    SupplierProductDetailsComponent,
    DashboardComponent,
    SupplierListComponent,
    ResellerListComponent,
    ResellerDetailsComponent,
    ResellerPaymentReversalComponent,
    SupplierPaymentReversalComponent
  ],
  imports: [
    CommonModule,
    KeyAccountManagementRoutingModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class KeyAccountManagementModule {
}

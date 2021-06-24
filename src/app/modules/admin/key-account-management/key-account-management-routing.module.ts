import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResellerComplaintsComponent} from '~admin/key-account-management/components/reseller/reseller-complaints/reseller-complaints.component';
import {SupplierComplaintsComponent} from '~admin/key-account-management/components/supplier/supplier-complaints/supplier-complaints.component';
import {SupplierNewRegistrationComponent} from '~admin/key-account-management/components/supplier/supplier-new-registration/supplier-new-registration.component';
import {SupplierOnboardingApprovalComponent} from '~admin/key-account-management/components/supplier/supplier-onboarding-approval/supplier-onboarding-approval.component';
import {SupplierDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-details/supplier-details.component';
import {SupplierProductDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-product-details/supplier-product-details.component';
import {DashboardComponent} from '~admin/key-account-management/components/dashboard/dashboard.component';
import {SupplierListComponent} from '~admin/key-account-management/components/supplier/supplier-list/supplier-list.component';
import {ResellerListComponent} from '~admin/key-account-management/components/reseller/reseller-list/reseller-list.component';
import {ResellerDetailsComponent} from '~admin/key-account-management/components/reseller/reseller-details/reseller-details.component';
import {ResellerPaymentReversalComponent} from '~admin/key-account-management/components/reseller/reseller-payment-reversal/reseller-payment-reversal.component';
import {SupplierPaymentReversalComponent} from '~admin/key-account-management/components/supplier/supplier-payment-reversal/supplier-payment-reversal.component';
import {SupplierCatalogProductDetailsComponent} from '~admin/key-account-management/components/supplier/supplier-catalog-product-details/supplier-catalog-product-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'reseller-complaints',
    component: ResellerComplaintsComponent
  },
  {
    path: 'supplier-complaints',
    component: SupplierComplaintsComponent
  },
  {
    path: 'supplier-new-registration',
    component: SupplierNewRegistrationComponent
  },
  {
    path: 'supplier-onboarding-approval',
    component: SupplierOnboardingApprovalComponent
  },
  {
    path: 'supplier-details',
    component: SupplierListComponent,
  },
  {
    path: 'supplier-details/:id',
    component: SupplierDetailsComponent
  },
  {
    path: 'supplier-product-details',
    component: SupplierProductDetailsComponent
  },
  {
    path: 'supplier-product-details/:id/:name',
    component: SupplierCatalogProductDetailsComponent
  },
  {
    path: 'reseller-details',
    component: ResellerDetailsComponent
  },
  {
    path: 'reseller-list',
    component: ResellerListComponent
  },
  {
    path: 'reseller-payment-reversal',
    component: ResellerPaymentReversalComponent
  },
  {
    path: 'supplier-payment-reversal',
    component: SupplierPaymentReversalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyAccountManagementRoutingModule {
}

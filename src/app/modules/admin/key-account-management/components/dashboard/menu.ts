const baseKAMPath = '/admin/key-account-management/';

export interface IMenuItem {
  url: string;
  label: string;
}

export const supplierDashboardMenu: IMenuItem[] = [
  {
    url: `${baseKAMPath}supplier-new-registration`,
    label: 'New Supplier Registration'
  },
  {
    url: `${baseKAMPath}supplier-list`,
    label: 'View Supplier Details'
  },
  {
    url: `${baseKAMPath}supplier-product-details`,
    label: 'View Product Details'
  },
  {
    url: `${baseKAMPath}supplier-onboarding-approval`,
    label: 'Supplier Onboarding Approval'
  },
  {
    url: `${baseKAMPath}supplier-complaints`,
    label: 'Complaints'
  },
  {
    url: `${baseKAMPath}supplier-payment-reversal`,
    label: 'Payment Reversal'
  }
];


export const resellerDashboardMenu: IMenuItem[] = [
  {
    url: `${baseKAMPath}reseller-list`,
    label: 'View Re-Seller Details'
  },
  {
    url: `${baseKAMPath}reseller-complaints`,
    label: 'Complaints'
  },
  {
    url: `${baseKAMPath}reseller-payment-reversal`,
    label: 'Payment Reversal'
  }
];

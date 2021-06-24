import * as fromAdminReducer from '~store/admin/admin.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBaseFeature = createFeatureSelector<fromAdminReducer.IAdminState>(fromAdminReducer.adminFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.error);
export const getIsMsg = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.msg);
export const getUploadedCatalogues = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.uploadedCatalogues);
// export const getCatalogueDownload = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.catalogueExcel);
export const getCatalogueProducts = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.catalogueProducts);

export const getCatalogueProductList$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.catalogueProductLists
);

// export const getProductDetails$ = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.productDetails);
export const getProductDetail$ = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.productDetail);

// tslint:disable-next-line: max-line-length
export const getCataloguesContentManagements$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.cataloguesContentManagements
);

export const KAMSupplierList$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMSupplierList
);

export const KAMSupplierDetails$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMSupplierDetails
);

export const KAMCatalogList$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMCatalogList
);

export const KAMProductDetails$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMProductDetails
);

export const KAMSupplierOnboardings$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMSupplierOnboardings
);

export const KAMApprovedResponse$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMApprovedResponse
);

export const KAMSupplierComplaints$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMSupplierComplaints
);

export const KAMResellerComplaints$ = createSelector(
  selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.KAMResellerComplaints
);

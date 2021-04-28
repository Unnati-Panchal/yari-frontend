import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdminReducer from '~store/admin/admin.reducer';

export const selectBaseFeature = createFeatureSelector<fromAdminReducer.IAdminState>(fromAdminReducer.adminFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.error);
export const getIsMsg = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.msg);
export const getUploadedCatalogues = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.uploadedCatalogues);
// export const getCatalogueDownload = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.catalogueExcel);
export const getCatalogueProducts = createSelector(selectBaseFeature, (state: fromAdminReducer.IAdminState) => state.catalogueProducts);

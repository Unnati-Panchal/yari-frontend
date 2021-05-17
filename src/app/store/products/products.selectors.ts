import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromProductsReducer from '~store/products/products.reducer';

export const selectBaseFeature = createFeatureSelector<fromProductsReducer.IProductsState>(fromProductsReducer.productFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.error);
export const getIsMsg = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.msg);
export const getCategories = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.categories);
export const getCities = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.cities);
export const getStates = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.states);
export const getBulkBasicUploadTemplate = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.file);
export const bulkUploadCatalog = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.bulkUploadBasic);
export const getCatalogs = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.catalogs);
export const getSpecTemplate$ = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.specTemplate);
export const getCatalogProducts$ = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.catalogProducts);
export const getBulkUploadStatuses$ = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) =>
  state.bulkUploadStatuses);
export const getSingleBulkUploadStatus$ = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) =>
  state.singleBulkUploadStatus);
export const getSelectedCatalogue$ = createSelector(selectBaseFeature,
  (state: fromProductsReducer.IProductsState) => state.selectedCatalogue);

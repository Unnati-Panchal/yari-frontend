import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromProductsReducer from '~store/products/products.reducer';

export const selectBaseFeature = createFeatureSelector<fromProductsReducer.IProductsState>(fromProductsReducer.productFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.error);
export const getCategories = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.categories);

export const getBulkBasicUploadTemplate = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.file);
export const bulkUploadCatalog = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.bulkUploadBasic);
export const getCatalogs = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.catalogs);
export const getBulkSpecificationsUploadTemplate = createSelector(
  selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.specTemplate);

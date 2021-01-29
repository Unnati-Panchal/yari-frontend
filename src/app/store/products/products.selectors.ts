import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromProductsReducer from '~store/products/products.reducer';

export const selectBaseFeature = createFeatureSelector<fromProductsReducer.IProductsState>(fromProductsReducer.productFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.error);
export const getCategories = createSelector(selectBaseFeature, (state: fromProductsReducer.IProductsState) => state.categories);

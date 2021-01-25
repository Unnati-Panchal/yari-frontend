import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromAuthReducer from '~store/auth/auth.reducer';

export const selectBaseFeature = createFeatureSelector<fromAuthReducer.IAuthState>(fromAuthReducer.authFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.error);
export const getSupplierRegResponse = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.supplierRegResponse);
export const getSupplierLoginResponse = createSelector(
  selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.supplierLoginResponse);

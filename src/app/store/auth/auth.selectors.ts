import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromAuthReducer from '~store/auth/auth.reducer';

export const selectBaseFeature = createFeatureSelector<fromAuthReducer.IAuthState>(fromAuthReducer.authFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.error);
export const getRegResponse = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.regResponse);
export const getLoginResponse = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.loginResponse);

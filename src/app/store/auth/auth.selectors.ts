import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '~store/auth/auth.reducer';

export const selectBaseFeature = createFeatureSelector<fromAuth.IAuthState>(fromAuth.authFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromAuth.IAuthState) => state.isLoading);
export const getIsError = createSelector(selectBaseFeature, (state: fromAuth.IAuthState) => state.isError);

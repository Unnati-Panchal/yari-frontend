import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromProfileReducer from '~store/profile/profile.reducer';

export const selectBaseFeature = createFeatureSelector<fromProfileReducer.IProfileState>(fromProfileReducer.profileFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.error);
export const getBuckets = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.buckets);

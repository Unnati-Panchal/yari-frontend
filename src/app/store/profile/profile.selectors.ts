import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromProfileReducer from '~store/profile/profile.reducer';

export const selectBaseFeature = createFeatureSelector<fromProfileReducer.IProfileState>(fromProfileReducer.profileFeatureKey);

export const getIsLoading$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.loading);
export const getIsError$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.error);
export const getBuckets$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.buckets);
export const getBucketItems$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.bucketItems);
export const deleteBucketItem$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.msg);
export const insertBucketItem$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.msg);
export const createBucket$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.id);
export const updateBucket$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.msg);
export const addImageToBucket$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.msg);
export const removeImage$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.msg);
export const uploadImage$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.url);
export const getImages$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.images);

export const getSupplierSettlement$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.payments);
export const getRatingAndReviews$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.ratingsAndReviews);
export const exchangedReturned$ = createSelector(selectBaseFeature, (state: fromProfileReducer.IProfileState) => state.exchangedReturned);

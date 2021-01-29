import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromThirdPartyReducer from '~store/third-party/third-party.reducer';

export const selectBaseFeature = createFeatureSelector<fromThirdPartyReducer.IThirdPartyState>(fromThirdPartyReducer.thirdPartyFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromThirdPartyReducer.IThirdPartyState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromThirdPartyReducer.IThirdPartyState) => state.error);
export const getEmailVerificationResponse = createSelector(selectBaseFeature,
  (state: fromThirdPartyReducer.IThirdPartyState) => state.emailVerificationResponse);

export const getUploadedGstCertificate = createSelector(selectBaseFeature,
  (state: fromThirdPartyReducer.IThirdPartyState) => state.uploadedGstCertificate);

export const getUploadedPanCard = createSelector(selectBaseFeature,
  (state: fromThirdPartyReducer.IThirdPartyState) => state.uploadedPanCard);


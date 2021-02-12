import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromAuthReducer from '~store/auth/auth.reducer';

export const selectBaseFeature = createFeatureSelector<fromAuthReducer.IAuthState>(fromAuthReducer.authFeatureKey);

export const getIsLoading = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.loading);
export const getIsError = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.error);
export const getRegResponse = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.regResponse);
export const getToken = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.token);

export const submitKYCForVerificationResponse = createSelector(selectBaseFeature,
  (state: fromAuthReducer.IAuthState) => state.submitKYCForVerificationResponse);
export const panVerification = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.panVerification);
export const gstVerification = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.gstVerification);
export const bankVerification = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.bankVerification);
export const generateOtp = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.generateOtp);
export const verifyOtpResponse = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.verifyOtpResponse);
export const approveKYCResponse = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.approveKYCResponse);
export const onBoarders = createSelector(selectBaseFeature, (state: fromAuthReducer.IAuthState) => state.onBoarders);

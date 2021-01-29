import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromThirdPartyActions from '~store/third-party/third-party.actions';
import {IGstPanResponse} from '@yaari/models/third-party/third-party.interface';

export const thirdPartyFeatureKey = 'third-party';

export interface IThirdPartyState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  email: string;
  certificate: string;
  panCard: number;
  emailVerificationResponse: IGstPanResponse;
  uploadedGstCertificate: IGstPanResponse;
  uploadedPanCard: IGstPanResponse;
}

export const thirdPartyInitialState: IThirdPartyState = {
  loading: false,
  error: null,
  email: '',
  certificate: '',
  panCard: null,
  emailVerificationResponse: null,
  uploadedGstCertificate: null,
  uploadedPanCard: null
};

const thirdPartyReducer = createReducer(
  thirdPartyInitialState,
  on(fromThirdPartyActions.emailVerification, (state) => ({...state, loading: true})),
  on(fromThirdPartyActions.emailVerificationSuccess, (state, action) => ({
    ...state,
    loading: false,
    emailVerificationResponse: action.emailVerificationResponse
  })),
  on(fromThirdPartyActions.emailVerificationError, (state, action) => ({ ...state, loading: false, error: action.error })),

  on(fromThirdPartyActions.uploadGstCertificate, (state) => ({...state, loading: true})),
  on(fromThirdPartyActions.uploadGstCertificateSuccess, (state, action) => ({
    ...state,
    loading: false,
    uploadedGstCertificate: action.uploadedGstCertificate
  })),
  on(fromThirdPartyActions.uploadGstCertificateError, (state, action) => ({ ...state, loading: false, error: action.error })),

  on(fromThirdPartyActions.uploadPanCard, (state) => ({...state, loading: true})),
  on(fromThirdPartyActions.uploadPanCardSuccess, (state, action) => ({
    ...state,
    loading: false,
    uploadedPanCard: action.uploadedPanCard
  })),
  on(fromThirdPartyActions.uploadPanCardError, (state, action) => ({ ...state, loading: false, error: action.error })),

);

// tslint:disable-next-line:typedef
export function reducer(state: IThirdPartyState | undefined, action: Action) {
  return thirdPartyReducer(state, action);
}

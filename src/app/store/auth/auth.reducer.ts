import {Action, createReducer, on} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import {
  IEditSupplierProfile,
  ILogin,
  IOnboarders,
  IRegistration,
  ISubmitKYCForVerificationResponse,
  IToken,
  IVerifyOtp,
  KYCDetailsResponse
} from '@yaari/models/auth/auth.interface';

export const authFeatureKey = 'auth';

export interface IAuthState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  regRequest: IRegistration;
  regResponse: IRegistration;
  loginRequest: ILogin;
  token: IToken;
  email: string;
  passwordRecoveryResponse: string;
  KYCVerification: IRegistration;
  submitKYCForVerificationResponse: ISubmitKYCForVerificationResponse;
  panVerification: KYCDetailsResponse;
  gstVerification: KYCDetailsResponse;
  bankVerification: KYCDetailsResponse;
  generateOtp: KYCDetailsResponse;
  verifyOtp: IVerifyOtp;
  verifyOtpResponse: KYCDetailsResponse;
  approveKYC: IRegistration;
  approveKYCResponse: IRegistration;
  onBoarders: IOnboarders[];
  supplierProfileChanges: IEditSupplierProfile;
  supplierDetails: IRegistration;
  fileUpload: File;
  url: string;
}

export const authInitialState: IAuthState = {
  loading: false,
  error: null,
  regRequest: null,
  regResponse: null,
  token: null,
  loginRequest: null,
  email: '',
  passwordRecoveryResponse: '',
  KYCVerification: null,
  submitKYCForVerificationResponse: null,
  panVerification: null,
  gstVerification: null,
  bankVerification: null,
  generateOtp: null,
  verifyOtp: null,
  verifyOtpResponse: null,
  approveKYC: null,
  approveKYCResponse: null,
  onBoarders: [],
  supplierProfileChanges: null,
  supplierDetails: null,
  fileUpload: null,
  url: ''
};

const authReducer = createReducer(
  authInitialState,
  on(fromAuthActions.clearState, state => ({...state, loading: false, isError: null})),


  on(fromAuthActions.registration, (state, action) => ({
    ...state, loading: true, regRequest: action.regRequest
  })),
  on(fromAuthActions.registrationSuccess, (state, action) => ({
    ...state, loading: false, regResponse: action.regResponse
  })),
  on(fromAuthActions.registrationError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.editSupplier, (state, action) => ({
    ...state, loading: true, supplierProfileChanges: action.supplierProfileChanges
  })),
  on(fromAuthActions.editSupplierSuccess, (state, action) => ({
    ...state, loading: false, regResponse: action.regResponse
  })),
  on(fromAuthActions.editSupplierError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.supplierDetails, (state) => ({...state, loading: true})),
  on(fromAuthActions.supplierDetailsSuccess, (state, action) => ({
    ...state, loading: false, supplierDetails: action.supplierDetails})),
  on(fromAuthActions.supplierDetailsError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.login, (state, action) => ({
    ...state, loading: true, loginRequest: action.loginRequest
  })),
  on(fromAuthActions.loginSuccess, (state, action) => ({
    ...state, loading: false, token: action.token
  })),
  on(fromAuthActions.loginError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.passwordRecovery, (state, action) => ({
    ...state, loading: true, email: action.email
  })),
  on(fromAuthActions.passwordRecoverySuccess, (state, action) => ({
    ...state, loading: false, passwordRecoveryResponse: action.passwordRecoveryResponse
  })),
  on(fromAuthActions.passwordRecoveryError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.submitKYCForVerification, (state, action) => ({
    ...state, loading: true, KYCVerification: action.KYCVerification
  })),
  on(fromAuthActions.submitKYCForVerificationSuccess, (state, action) => ({
    ...state, loading: false, submitKYCForVerificationResponse: action.submitKYCForVerificationResponse
  })),
  on(fromAuthActions.submitKYCForVerificationError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.panVerification, (state, action) => ({
    ...state, loading: true, panReq: action.panReq
  })),
  on(fromAuthActions.panVerificationSuccess, (state, action) => ({
    ...state, loading: false, panVerification: action.panVerification
  })),
  on(fromAuthActions.panVerificationError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.gstVerification, (state, action) => ({
    ...state, loading: true, gstReq: action.gstReq
  })),
  on(fromAuthActions.gstVerificationSuccess, (state, action) => ({
    ...state, loading: false, gstVerification: action.gstVerification
  })),
  on(fromAuthActions.gstVerificationError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.bankVerification, (state) => ({
    ...state, loading: true
  })),
  on(fromAuthActions.bankVerificationSuccess, (state, action) => ({
    ...state, loading: false, bankVerification: action.bankVerification
  })),
  on(fromAuthActions.bankVerificationError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.generateOtp, (state, action) => ({
    ...state, loading: true, email: action.email
  })),
  on(fromAuthActions.generateOtpSuccess, (state, action) => ({
    ...state, loading: false, generateOtp: action.generateOtp
  })),
  on(fromAuthActions.generateOtpError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.verifyOtp, (state, action) => ({
    ...state, loading: true, verifyOtp: action.verifyOtp
  })),
  on(fromAuthActions.verifyOtpSuccess, (state, action) => ({
    ...state, loading: false, verifyOtpResponse: action.verifyOtpResponse
  })),
  on(fromAuthActions.verifyOtpError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.approveKYC, (state, action) => ({
    ...state, loading: true, approveKYC: action.approveKYC
  })),
  on(fromAuthActions.approveKYCSuccess, (state, action) => ({
    ...state, loading: false, approveKYCResponse: action.approveKYCResponse
  })),
  on(fromAuthActions.approveKYCError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.uploadSupplierPicture, (state, action) => ({
    ...state, loading: true, fileUpload: action.fileUpload
  })),
  on(fromAuthActions.uploadSupplierPictureSuccess, (state, action) => ({
    ...state, loading: false, url: action.url
  })),
  on(fromAuthActions.uploadSupplierPictureError, (state, action) => ({...state, loading: false, error: action.error})),


  on(fromAuthActions.getOnboarders, (state) => ({
    ...state, loading: true
  })),
  on(fromAuthActions.getOnboardersSuccess, (state, action) => ({
    ...state, loading: false, onBoarders: action.onBoarders
  })),
  on(fromAuthActions.getOnboardersError, (state, action) => ({...state, loading: false, error: action.error})),
);


// tslint:disable-next-line:typedef
export function reducer(state: IAuthState | undefined, action: Action) {
  return authReducer(state, action);
}

// tslint:disable-next-line:typedef
export function clearState(red: (state: {}, action: Action) => any) {
  return (state: {}, action: Action) => {
    if (action.type === fromAuthActions.clearState.type) {
      state = undefined;
    }
    return red(state, action);
  };
}

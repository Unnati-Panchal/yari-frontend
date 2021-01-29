import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import {ILogin, IRegistration} from '@yaari/models/auth/auth.interface';

export const authFeatureKey = 'auth';

export interface IAuthState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  regRequest: IRegistration;
  regResponse: IRegistration;
  loginRequest: ILogin;
  loginResponse: ILogin;
  email: string;
  passwordRecoveryResponse: string;
}

export const authInitialState: IAuthState = {
  loading: false,
  error: null,
  regRequest: null,
  regResponse: null,
  loginResponse: null,
  loginRequest: null,
  email: '',
  passwordRecoveryResponse: ''
};

const authReducer = createReducer(
  authInitialState,
  on(fromAuthActions.clearState, state => ({ ...state, loading: false, isError: null })),
  on(fromAuthActions.registration, (state, action) => ({
    ...state,
    loading: true,
    regRequest: action.regRequest
  })),
  on(fromAuthActions.registrationSuccess, (state, action) => ({
    ...state,
    loading: false,
    regResponse: action.regResponse
  })),
  on(fromAuthActions.registrationError, (state, action) => ({ ...state, loading: false, error: action.error })),
  on(fromAuthActions.login, (state, action) => ({
    ...state,
    loading: true,
    loginRequest: action.loginRequest
  })),
  on(fromAuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    loginResponse: action.loginResponse
  })),
  on(fromAuthActions.loginError, (state, action) => ({ ...state, loading: false, error: action.error })),
  on(fromAuthActions.passwordRecovery, (state, action) => ({
    ...state,
    loading: true,
    email: action.email
  })),
  on(fromAuthActions.passwordRecoverySuccess, (state, action) => ({
    ...state,
    loading: false,
    passwordRecoveryResponse: action.passwordRecoveryResponse
  })),
  on(fromAuthActions.passwordRecoveryError, (state, action) => ({ ...state, loading: false, error: action.error })),
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

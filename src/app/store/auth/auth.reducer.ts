import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';

import {ICategory, ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';
import {ILogin} from '~auth/login/interfaces/supplier-login.interface';

export const authFeatureKey = 'auth';

export interface IAuthState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  supplierRegRequest: ISupplierRegistration;
  supplierRegResponse: ISupplierRegistration;
  supplierLoginResponse: ILogin;
  email: string;
  passwordRecoveryResponse: string;
  categories: ICategory[];
}

export const authInitialState: IAuthState = {
  loading: false,
  error: null,
  supplierRegRequest: null,
  supplierRegResponse: null,
  supplierLoginResponse: null,
  email: '',
  passwordRecoveryResponse: '',
  categories: []
};

const authReducer = createReducer(
  authInitialState,
  on(fromAuthActions.clearState, state => ({ ...state, loading: false, isError: null })),
  on(fromAuthActions.supplierRegistration, (state, action) => ({
    ...state,
    loading: true,
    supplierRegRequest: action.supplierRegRequest
  })),
  on(fromAuthActions.supplierRegistrationSuccess, (state, action) => ({
    ...state,
    loading: false,
    supplierRegResponse: action.supplierRegResponse
  })),
  on(fromAuthActions.supplierRegistrationError, (state, action) => ({ ...state, loading: false, error: action.error })),
  on(fromAuthActions.supplierLogin, (state, action) => ({
    ...state,
    loading: true,
    supplierLoginRequest: action.supplierLoginRequest
  })),
  on(fromAuthActions.supplierLoginSuccess, (state, action) => ({
    ...state,
    loading: false,
    supplierLoginResponse: action.supplierLoginResponse
  })),
  on(fromAuthActions.supplierLoginError, (state, action) => ({ ...state, loading: false, error: action.error })),
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
  on(fromAuthActions.getCategories, (state) => ({...state, loading: true})),
  on(fromAuthActions.getCategoriesSuccess, (state, action) => ({
    ...state,
    loading: false,
    categories: action.categories
  })),
  on(fromAuthActions.getCategoriesError, (state, action) => ({ ...state, loading: false, error: action.error })),

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

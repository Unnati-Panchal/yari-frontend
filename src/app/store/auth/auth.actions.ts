import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import {ICategory, ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';
import {ILogin} from '~auth/login/interfaces/supplier-login.interface';

export const clearState = createAction('[AUTH] clear state');

export const supplierRegistration = createAction('[AUTH] supplier registration', props<{ supplierRegRequest: ISupplierRegistration }>());

export const supplierRegistrationSuccess = createAction('[AUTH] supplier registration success',
  props<{ supplierRegResponse: ISupplierRegistration }>());

export const supplierRegistrationError = createAction('[AUTH] supplier registration error', props<{ error: HttpErrorResponse }>());

export const supplierLogin = createAction('[AUTH] supplier login', props<{ supplierLoginRequest: ILogin }>());

export const supplierLoginSuccess = createAction('[AUTH] supplier login success', props<{ supplierLoginResponse: ILogin }>());

export const supplierLoginError = createAction('[AUTH] supplier login error', props<{ error: HttpErrorResponse }>());

export const passwordRecovery = createAction('[AUTH] password recovery', props<{ email: string }>());

export const passwordRecoverySuccess = createAction('[AUTH] password recovery success', props<{ passwordRecoveryResponse: string }>());

export const passwordRecoveryError = createAction('[AUTH] password recovery error', props<{ error: HttpErrorResponse }>());

export const getCategories = createAction('[AUTH] get categories');

export const getCategoriesSuccess = createAction('[AUTH] get categories success', props<{ categories: ICategory[]}>());

export const getCategoriesError = createAction('[AUTH] get categories error', props<{ error: HttpErrorResponse }>());

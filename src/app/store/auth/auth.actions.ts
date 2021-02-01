import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import {ILogin, IRegistration, IToken} from '@yaari/models/auth/auth.interface';

export const clearState = createAction('[AUTH] clear state');

export const registration = createAction('[AUTH] registration', props<{ regRequest: IRegistration }>());

export const registrationSuccess = createAction('[AUTH] registration success',
  props<{ regResponse: IRegistration }>());

export const registrationError = createAction('[AUTH] registration error', props<{ error: HttpErrorResponse }>());

export const login = createAction('[AUTH] login', props<{ loginRequest: ILogin }>());

export const loginSuccess = createAction('[AUTH] login success', props<{ token: IToken }>());

export const loginError = createAction('[AUTH] login error', props<{ error: HttpErrorResponse }>());

export const passwordRecovery = createAction('[AUTH] password recovery', props<{ email: string }>());

export const passwordRecoverySuccess = createAction('[AUTH] password recovery success', props<{ passwordRecoveryResponse: string }>());

export const passwordRecoveryError = createAction('[AUTH] password recovery error', props<{ error: HttpErrorResponse }>());

import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';

export const clearState = createAction('[AUTH] clear state');

export const supplierRegistration = createAction('[AUTH] supplier registration', props<{ supplierRegRequest: ISupplierRegistration }>());

export const supplierRegistrationSuccess = createAction('[AUTH] supplier registration success',
  props<{ supplierRegResponse: ISupplierRegistration }>());

export const supplierRegistrationError = createAction('[AUTH] supplier registration error', props<{ error: HttpErrorResponse }>());

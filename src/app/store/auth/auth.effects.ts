import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromAuthActions from '~store/auth/auth.actions';

import {SupplierRegistrationService} from '~auth/registration/services/supplier-registration.service';
import {SupplierLoginService} from '~auth/login/services/supplier-login.service';

import {ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';
import {ILogin} from '~auth/login/interfaces/supplier-login.interface';

@Injectable()
export class AuthEffects {
  public registerSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.supplierRegistration),
      map(action => action.supplierRegRequest),
      switchMap((supplierRegRequest: ISupplierRegistration) =>
        this._supplierRegistrationService.registerSupplier(supplierRegRequest).pipe(
          map((supplierRegResponse: ISupplierRegistration) => fromAuthActions.supplierRegistrationSuccess({ supplierRegResponse })),
          catchError(error => of(fromAuthActions.supplierRegistrationError({ error })))
        )
      )
    )
  );

  public loginSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.supplierLogin),
      map(action => action.supplierLoginRequest),
      switchMap((supplierLoginRequest: ILogin) =>
        this._supplierLoginService.supplierLogin(supplierLoginRequest).pipe(
          map((supplierLoginResponse: ILogin) => fromAuthActions.supplierLoginSuccess({ supplierLoginResponse })),
          catchError(error => of(fromAuthActions.supplierLoginError({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _supplierRegistrationService: SupplierRegistrationService,
    private _supplierLoginService: SupplierLoginService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromAuthActions from '~store/auth/auth.actions';

import {AuthService} from '@yaari/services/auth/auth.service';
import {ILogin, IRegistration} from '@yaari/models/auth/auth.interface';

@Injectable()
export class AuthEffects {
  public registerSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.registration),
      map(action => action.regRequest),
      switchMap((regRequest: IRegistration) =>
        this._authService.registerSupplier(regRequest).pipe(
          map((regResponse: IRegistration) => fromAuthActions.registrationSuccess({ regResponse })),
          catchError(error => of(fromAuthActions.registrationError({ error })))
        )
      )
    )
  );

  public loginSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.login),
      map(action => action.loginRequest),
      switchMap((loginRequest: ILogin) =>
        this._authService.login(loginRequest).pipe(
          map((loginResponse: ILogin) => fromAuthActions.loginSuccess({ loginResponse })),
          catchError(error => of(fromAuthActions.loginError({ error })))
        )
      )
    )
  );

  public accountRecovery = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.passwordRecovery),
      map(action => action.email),
      switchMap((email: string) =>
        this._authService.passwordRecovery(email).pipe(
          map((passwordRecoveryResponse: string) => fromAuthActions.passwordRecoverySuccess({ passwordRecoveryResponse })),
          catchError(error => of(fromAuthActions.passwordRecoveryError({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

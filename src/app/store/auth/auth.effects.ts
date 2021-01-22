import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromAuthActions from '~store/auth/auth.actions';

import {SupplierRegistrationService} from '~auth/registration/services/supplier-registration.service';
import {ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';

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

  constructor(
    private _actions$: Actions,
    private _supplierRegistrationService: SupplierRegistrationService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

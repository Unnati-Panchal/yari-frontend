import {Injectable} from '@angular/core';
import {CanActivate, NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {filter} from 'rxjs/operators';
import {AuthService} from '@yaari/services/auth/auth.service';
import {AppFacade, IAppState} from '~store/app.state';
import {select, Store} from '@ngrx/store';
import * as fromProfileSelectors from '~store/profile/profile.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  public isPickupAddress$ = this._store.pipe(select(fromProfileSelectors.getPickupAddress$));

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _appFacade: AppFacade,
    private _store: Store<IAppState>,
  ) {
  }

  public canActivate(): boolean {
    this._router.events.pipe(filter(val => val instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        this._appFacade.clearMessages();
        if (
          val.url !== '/auth/reset-password' &&
          val.url !== '/auth/registration'  &&
          val.url !== '/auth/password-recovery' &&
          !this._authService.accessToken
        ) {
          this._authService.redirectToLogin();
          return false;
        }

        this.isPickupAddress$.subscribe((address) => {
          if (
            val.url !== '/auth/reset-password' &&
            val.url !== '/auth/registration'  &&
            val.url !== '/auth/password-recovery' &&
            !address
          ) {
            this._router.navigate(['app/profile/pickup-address']);
            return true;
          }
        });
    });
    return true;
  }
}

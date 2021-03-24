import {Injectable} from '@angular/core';
import {CanActivate, NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {filter} from 'rxjs/operators';
import {AuthService} from '@yaari/services/auth/auth.service';
import {AppFacade, IAppState} from '~store/app.state';
import {Store} from '@ngrx/store';
import * as fromProfileActions from '~store/profile/profile.actions';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _appFacade: AppFacade,
    private _store: Store<IAppState>,
  ) {
  }

  public canActivate(): boolean {
    this._store.dispatch(fromProfileActions.getPickupAddress());

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
    });
    return true;
  }
}

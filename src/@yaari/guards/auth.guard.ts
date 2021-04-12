import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter } from 'rxjs/operators';
import { AuthService } from '@yaari/services/auth/auth.service';
import { AppFacade, IAppState } from '~store/app.state';
import { select, Store } from '@ngrx/store';
import * as fromProfileActions from '~store/profile/profile.actions';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

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
          val.url !== '/auth/registration' &&
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


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _appFacade: AppFacade,
    private _store: Store<IAppState>,
  ) {
  }

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details),
  );

  public canActivate(): boolean {
    this._router.events.pipe(filter(val => val instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {

        this._appFacade.clearMessages();
        if (val.url !== '/admin/login' && val.url !== '/admin/forgot-password') {
          if (!this._authService.accessToken) {
            this._snackBar.open('You are not authorized, Please log in', '', { duration: 3000 });
            this._router.navigate(['/admin/login']);
            return false;
          }
          else {
            this._store.dispatch(fromAuthActions.adminDetails());
          }
        }
        else if (val.url === '/admin/login' && this._authService.accessToken) {
          this._store.dispatch(fromAuthActions.adminDetails());
          this.adminDetails$.subscribe(adminDetails => {
            this._router.navigate([`/admin/${adminDetails.admin_role.split('_').join('-')}`]);
            return false;
          });
        }
      });
    return true;
  }
}

import {Injectable} from '@angular/core';
import {CanActivate, NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {filter} from 'rxjs/operators';
import {AuthService} from '@yaari/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _snackBar: MatSnackBar, private _router: Router) {
  }

  public canActivate(): boolean {
    this._router.events.pipe(filter(val => val instanceof NavigationEnd))
      .subscribe(() => {
        if (!this._authService.accessToken) {
          const msg = `You are not authorized, please log in.`;
          this._snackBar.open(msg, '', {duration: 3000});
          this._authService.redirectToLogin();
          return false;
        }
    });
    return true;
  }
}

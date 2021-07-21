import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthService} from '@yaari/services/auth/auth.service';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromAdminActions from '~store/admin/admin.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService, private _snackBar: MatSnackBar, private _store: Store<IAppState>,) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._auth.accessToken) {
      request = request.clone({ setHeaders: { 'X-Auth-Token': `${this._auth.accessToken}` } });
    }

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            this._snackBar.open(evt.body.msg, '', { duration: 3000 });
          }
        }
      }),
      catchError(err => {
        if (err.url.includes('/api/v1/admin')) {
          if ((err.status === 401 || err.status === 403)) {
            const msg = err.status === 401 ? `Status 401. You are not authorized, please log in` : `Status 403. You are not authorized`;
            this._snackBar.open(msg, '', { duration: 3000 });
            if (err.status === 401) {
              this._auth.redirectToAdminLogin();
            }
            return of(err);
          }
          if (err.status === 404 || err.error.detail) {
            let msg = '';
            if (Array.isArray(err.error.detail)) {
              err.error.detail.forEach(e => {
                msg += e.loc[1] + `: ` + e.msg + `\n`;
              });
            } else {
              msg = err.error.detail;
            }
            this._snackBar.open(msg, '', { duration: 3000 });
            return of(err);
          }
        }
        else if (err.url.includes('login/access-token?user_role=admin')) {
          const msg = err.error.detail;
          this._snackBar.open(msg, '', { duration: 3000 });
          return throwError(err);
        }
        else if (err.status === 401 || err.status === 403) {
          this._auth.logout();
          const msg = err.status === 401 ? `Status 401. You are not authorized, please log in` : `Status 403. You are not authorized, please log in`;
          this._snackBar.open(msg, '', { duration: 3000 });
          return of(err);
        }
        else if (err.status === 404 || err.error.detail) {
          const msg = err.error.detail;
          this._snackBar.open(msg, '', { duration: 3000 });
          return of(err);
        }

        if (err.status === 500) {
          this._snackBar.open(err.error, '', {duration: 3000});
          this._store.dispatch(fromAdminActions.stopLoading());
          return of(err);
        }
        return throwError(err);
      })
    );
  }
}

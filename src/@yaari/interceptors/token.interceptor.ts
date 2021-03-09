import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '@yaari/services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService, private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._auth.accessToken) {
      request = request.clone({setHeaders: {'X-Auth-Token': `${this._auth.accessToken}`}});
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          this._auth.logout();
          const msg = err.status === 401 ? `Status 401. You are not authorized, please log in` : `Status 403. You are not authorized, please log in`;
          this._snackBar.open(msg, '', {duration: 3000});
          return of(err);
        }
        if (err.status === 500) {
          this._snackBar.open(err.error, '', {duration: 3000});
          return of(err);
        }
        return throwError(err);
      })
    );
  }
}

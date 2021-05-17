import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

import { AppFacade, IAppState } from '~app/store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';


import { AdminService } from '@yaari/services/admin/admin.service';
import { AuthService } from '@yaari/services/auth/auth.service';
import { IResMsg } from '@yaari/models/admin/admin.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  constructor(
    private _store: Store<IAppState>,
    private _appFacade: AppFacade,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,

  ) { }

  public token$ = this._store.pipe(
    select(fromAuthSelectors.getToken),
    filter(token => !!token)
  );
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    tap(() => this.loading = false)
  );

  public hide: boolean;
  public loading: boolean;
  private _subscription: Subscription = new Subscription();
  forgotPasswordForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this.authorizedAdmin();
  }

  public authorizedAdmin(): void {
    this._subscription.add(this.token$.subscribe((token) => {
      this._auth.accessToken = token.access_token;
      this._store.dispatch(fromAuthActions.adminDetails());
    }));

  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  submit(): void {
    this._adminService.forgotPasswordAdmin(this.forgotPasswordForm.value.username).subscribe(
      (res: IResMsg) => {
        this._snackBar.open(res.msg, '', { duration: 5000 });
      });
  }
}

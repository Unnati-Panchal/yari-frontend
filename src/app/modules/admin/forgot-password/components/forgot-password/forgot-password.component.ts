import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppFacade, IAppState } from '~app/store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
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
    private _router: Router,
    private _adminService: AdminService,
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
    this._adminService.forgotPasswordAdmin(this.forgotPasswordForm.value.username).subscribe(res => {
      console.log(res);
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAdminDetails } from '@yaari/models/auth/auth.interface';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppFacade, IAppState } from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public token$ = this._store.pipe(
    select(fromAuthSelectors.getToken),
    filter(token => !!token)
  );

  public isLoading$ = this._store.pipe(
    select(fromAuthSelectors.getIsLoading)
  );

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details)
  );

  public hide: boolean;
  public loading: boolean;
  private _subscription: Subscription = new Subscription();
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    user_role: new FormControl('admin'),
  });

  constructor(private _store: Store<IAppState>, private _appFacade: AppFacade, private _auth: AuthService, private _router: Router) {
  }

  public ngOnInit(): void {
    this._appFacade.clearMessages();
    this.authorizedAdmin();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true;
    const loginRequest = this.loginForm.value;
    this._store.dispatch(fromAuthActions.login({ loginRequest }));

  }

  public authorizedAdmin(): void {
    this._subscription.add(this.token$.subscribe((token) => {
      this._auth.accessToken = token.access_token;
      this._store.dispatch(fromAuthActions.adminDetails());
    }));
    this._subscription.add(this.adminDetails$.subscribe((adminDetails: IAdminDetails) => {
      this.loading = false;
      const path = adminDetails.admin_role.split('_').join('-');
      this._router.navigate([`/admin/${path}`]);
    }));
  }

}

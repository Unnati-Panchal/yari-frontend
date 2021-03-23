import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';

import {AppFacade, IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProfileActions from '~store/profile/profile.actions';
import {Router} from '@angular/router';
import {AuthService} from '@yaari/services/auth/auth.service';
import * as fromProfileSelectors from '~store/profile/profile.selectors';

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
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    tap(() => this.loading = false)
  );
  public isPickupAddress$ = this._store.pipe(select(fromProfileSelectors.getPickupAddress$));
  public loginForm: FormGroup;
  public hide: boolean;
  public loading: boolean;
  public submitted: boolean;
  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _auth: AuthService,
              private _appFacade: AppFacade
  ) {
  }

  public ngOnInit(): void {
    this._appFacade.clearMessages();
    this.initLoginForm();
    this.authorizedSupplier();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public supplierLogin(): void {
    this.loginForm.updateValueAndValidity();
    if (!this.loginForm.valid) {
      return;
    }
    const loginRequest = this.loginForm.value;
    this.loading = true;
    this._store.dispatch(fromAuthActions.login({ loginRequest }));
    this.submitted = true;
  }

  public initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      user_role: 'supplier' // 'supplier' / 'admin'
    });
  }

  public authorizedSupplier(): void {
    this._subscription.add(this.token$.subscribe((token) => {
      this._auth.accessToken = token.access_token;
      this._store.dispatch(fromAuthActions.supplierDetails());
      this._store.dispatch(fromProfileActions.getPickupAddress());
    }));

    this._subscription.add(this.isPickupAddress$.subscribe((address) => {
      this.loading = false;
      if (this.submitted) {
        if (address) {
          this._router.navigate(['app/dashboard']);
        } else {
          this._router.navigate(['app/profile/pickup-address']);
        }
        this.submitted = false;
      }
      })
    );
  }

}

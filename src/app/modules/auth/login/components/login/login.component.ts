import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {Router} from '@angular/router';
import {AuthService} from '@yaari/services/auth/auth.service';

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
    filter(error => !!error)
  );
  public loginForm: FormGroup;
  public hide: boolean;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _auth: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.initLoginForm();
    this.authorizedSupplier();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public supplierLogin(): void {
    const loginRequest = this.loginForm.value;
    this._store.dispatch(fromAuthActions.login({ loginRequest }));
  }

  public initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      user_role: 'supplier' // 'supplier' / 'admin'
    });
  }

  public authorizedSupplier(): void {
    this._subscription.add(this.isError$.subscribe(error => console.log(error)));
    this._subscription.add(this.token$.subscribe((token) => {
      this._auth.accessToken = token.access_token;
      this._router.navigate(['app/dashboard']);
    })
    );
  }

}

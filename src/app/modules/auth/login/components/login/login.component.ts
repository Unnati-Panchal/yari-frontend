import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

import {ILogin} from '~auth/login/interfaces/supplier-login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public supplierResponse$ = this._store.pipe(
    select(fromAuthSelectors.getSupplierLoginResponse),
    filter(supplier => !!supplier)
  );
  public isSupplierError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    filter(error => !!error)
  );
  public supplierRegistrationForm: FormGroup;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.initLoginForm();

    const testCase = {
      username: 'user1111111111@example.com',
      password: 'manufacturer'
    };
    this.supplierLogin(testCase);

    this.authorizedSupplier();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public supplierLogin(supplierLoginRequest: ILogin): void {
    this._store.dispatch(fromAuthActions.supplierLogin({ supplierLoginRequest }));
  }

  public initLoginForm(): void {
    this.supplierRegistrationForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public authorizedSupplier(): void {
    this._subscription.add(
      this.isSupplierError$.subscribe(error => console.log(error))
    );

    this._subscription.add(
      this.supplierResponse$.subscribe(supplierRegResponse => console.log(supplierRegResponse))
    );
  }

}

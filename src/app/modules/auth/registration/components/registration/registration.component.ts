import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

import {ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public supplierResponse$ = this._store.pipe(
    select(fromAuthSelectors.getSupplierRegResponse),
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
    this.initRegistrationForm();

    const testCase = {
      contact_person: 'string',
      phone_no: 3246111113,
      email_id: 'user11111111111@example.com',
      city: 'string',
      type: 'manufacturer',
      price_range_min: 0,
      price_range_max: 0,
      average_monthly_stock: 0,
      primary_category_id: 1011,
      has_gst: false
    };
    this.registerSupplier(testCase);

    this.supplierRegistration();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public registerSupplier(supplierRegRequest: ISupplierRegistration): void {
    this._store.dispatch(fromAuthActions.supplierRegistration({ supplierRegRequest }));
  }

  public initRegistrationForm(): void {
    this.supplierRegistrationForm = this._formBuilder.group({
      contact_person: ['', Validators.required],
      phone_no: ['', Validators.required],
      email_id: ['', Validators.required],
      city: ['', Validators.required],
      type: ['', Validators.required],
      price_range_min: ['', Validators.required],
      price_range_max: ['', Validators.required],
      average_monthly_stock: ['', Validators.required],
      primary_category_id: ['', Validators.required],
      has_gst: ['', Validators.required]
    });
  }

  public supplierRegistration(): void {
    this._subscription.add(
      this.isSupplierError$.subscribe(error => console.log(error))
    );

    this._subscription.add(
      this.supplierResponse$.subscribe(supplierRegResponse => console.log(supplierRegResponse))
    );
  }

}

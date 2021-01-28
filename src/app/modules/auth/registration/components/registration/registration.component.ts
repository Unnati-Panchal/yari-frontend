import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

import {ICategory, ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';
import {CustomValidator} from '@yaari/utils/custom-validators';

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
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    filter(error => !!error)
  );
  public categories$ = this._store.pipe(
    select(fromAuthSelectors.getCategories),
    filter(categories => !!categories)
  );
  public regForm: FormGroup;
  public types = [
    {label: 'Retailer', key: 'retailer'},
    {label: 'Manufacturer', key: 'manufacturer'},
    {label: 'Wholesaler', key: 'wholesaler'}
  ];
  public categories: ICategory[];

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.initRegistrationForm();
    this.supplierRegistration();
    this._store.dispatch(fromAuthActions.getCategories());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public registerSupplier(): void {
    const supplierRegRequest: ISupplierRegistration = this.regForm.value;
    this._store.dispatch(fromAuthActions.supplierRegistration({ supplierRegRequest }));
  }

  public initRegistrationForm(): void {
    this.regForm = this._formBuilder.group({
      contact_person: ['', [Validators.required]],
      phone_no: ['', [Validators.required, CustomValidator.digitsOnly]],
      email_id: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, CustomValidator.lettersOnly]],
      type: ['', [Validators.required]],
      price_range_min: ['', [Validators.required, CustomValidator.digitsOnly]],
      price_range_max: ['', [Validators.required, CustomValidator.digitsOnly]],
      average_monthly_stock: ['', [Validators.required, CustomValidator.digitsOnly]],
      primary_category_id: ['', [Validators.required]],
      has_gst: ['', [Validators.required]],
    });
  }

  public supplierRegistration(): void {
    this._subscription.add(
      this.isError$.subscribe(error => console.log(error))
    );

    this._subscription.add(
      this.supplierResponse$.subscribe(supplierRegResponse => console.log(supplierRegResponse))
    );

    this._subscription.add(
      this.categories$.subscribe(categories => {
        console.log(categories);
        this.categories = [
          {name: 'test1', id: 1011},
          {name: 'test2', id: 1011},
          {name: 'test3', id: 1011}
        ];
      })
    );
  }

}

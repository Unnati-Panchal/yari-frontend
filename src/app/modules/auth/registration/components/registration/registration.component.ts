import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromProductsActions from '~store/products/products.actions';
import * as fromThirdPartyActions from '~store/third-party/third-party.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProductsSelectors from '~store/products/products.selectors';
import * as fromThirdPartySelectors from '~store/third-party/third-party.selectors';

import {CustomValidator} from '@yaari/utils/custom-validators';
import {ICategory} from '@yaari/models/product/product.interface';
import {IRegistration} from '@yaari/models/auth/auth.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationResponse$ = this._store.pipe(select(fromAuthSelectors.getRegResponse), filter(value => !!value));
  public isAuthError$ = this._store.pipe(select(fromAuthSelectors.getIsError), filter(error => !!error));
  public isProductError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(error => !!error));
  public isThirdPartyError$ = this._store.pipe(select(fromThirdPartySelectors.getIsError), filter(error => !!error));
  public categories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(categories => !!categories?.length));
  public emailVerification$ = this._store.pipe(select(fromThirdPartySelectors.getEmailVerificationResponse), filter(value => !!value));
  public uploadGstCertificate$ = this._store.pipe(select(fromThirdPartySelectors.getUploadedGstCertificate), filter(value => !!value));
  public uploadPanCard$ = this._store.pipe(select(fromThirdPartySelectors.getUploadedPanCard), filter(value => !!value));
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
    this._store.dispatch(fromProductsActions.getCategories());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public registerSupplier(): void {
    const regRequest: IRegistration = this.regForm.value;
    this._store.dispatch(fromAuthActions.registration({ regRequest }));
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
      certificate: ['', [Validators.required]],
      panCard: ['', [Validators.required]],
    });
  }

  public supplierRegistration(): void {
    this._subscription.add(this.isAuthError$.subscribe(error => console.log(error)));
    this._subscription.add(this.isProductError$.subscribe(error => console.log(error)));
    this._subscription.add(this.isThirdPartyError$.subscribe(error => console.log(error)));

    this._subscription.add(this.registrationResponse$.subscribe());
    this._subscription.add(this.categories$.subscribe(cat => this.categories = cat));
  }

  // TODO update the html and the error msgs
  public emailVerification(): void {
    const email = this.regForm.value.email_id;
    this._store.dispatch(fromThirdPartyActions.emailVerification({email}));

    this._subscription.add(this.emailVerification$.subscribe(res => console.log(res)));
  }

  public uploadGstCertificate(): void {
    const certificate = this.regForm.value.certificate;
    this._store.dispatch(fromThirdPartyActions.uploadGstCertificate({certificate}));

    this._subscription.add(this.uploadGstCertificate$.subscribe(res => console.log(res)));
  }

  public uploadPanCard(): void {
    const panCard = this.regForm.value.panCard;
    this._store.dispatch(fromThirdPartyActions.uploadPanCard({panCard}));

    this._subscription.add(this.uploadPanCard$.subscribe(res => console.log(res)));
  }

}

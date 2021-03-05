import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {AppFacade, IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromProductsActions from '~store/products/products.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProductsSelectors from '~store/products/products.selectors';

import {CustomValidator} from '@yaari/utils/custom-validators';
import {ICategory} from '@yaari/models/product/product.interface';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationResponse$ = this._store.pipe(select(fromAuthSelectors.getRegResponse), filter(value => !!value));
  public isAuthError$ = this._store.pipe(select(fromAuthSelectors.getIsError));
  public isProductError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(error => !!error));
  public categories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(categories => !!categories?.length));
  public generateOtp$ = this._store.pipe(select(fromAuthSelectors.generateOtp), filter(value => !!value));
  public onboarders$ = this._store.pipe(select(fromAuthSelectors.onBoarders), filter(onboarders => !!onboarders?.length));
  public regForm: FormGroup;
  public types = [
    {label: 'Retailer', key: 'retailer'},
    {label: 'Manufacturer', key: 'manufacturer'},
    {label: 'Wholesaler', key: 'wholesaler'}
  ];
  public categories: ICategory[];
  public loading;
  public loadingEmailVerification: boolean;
  public emailVerificationSuccessful: string;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _snackBar: MatSnackBar,
              private _appFacade: AppFacade
  ) {
  }

  public ngOnInit(): void {
    this._appFacade.clearMessages();
    this.initRegistrationForm();
    this.supplierRegistration();
    this.emailVerification();
    this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    this._store.dispatch(fromAuthActions.getOnboarders());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public registerSupplier(): void {
    this.loading = true;
    this.regForm.updateValueAndValidity();
    if (!this.regForm.value.termsAndConditions) {
      this.regForm.get('termsAndConditions').setErrors({requiredTrue: true});
    } else {
      this.regForm.get('termsAndConditions').setErrors(null);
    }
    if (this.regForm.value.selfOnboarded === true) {
      this.regForm.get('onboarder_id').patchValue(1);
    }
    const regRequest = this.regForm.value;
    if (!this.regForm.valid) {
      this.loading = false;
      return;
    }
    regRequest.email_id = this.emailVerificationSuccessful;
    this._store.dispatch(fromAuthActions.registration({regRequest}));
  }

  public initRegistrationForm(): void {
    this.regForm = this._formBuilder.group({
      is_active: [true],
      password: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      phone_no: ['', [Validators.required, CustomValidator.digitsOnly]],
      email_id: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      city: ['', [Validators.required, CustomValidator.lettersOnly]],
      state: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price_range_min: ['', [Validators.required, CustomValidator.digitsOnly]],
      price_range_max: ['', [Validators.required, CustomValidator.digitsOnly]],
      average_monthly_stock: ['', [Validators.required, CustomValidator.digitsOnly]],
      primary_category_id: ['', [Validators.required]],
      selfOnboarded: ['', [Validators.required]],
      has_gst: ['', [Validators.required]],
      gst_no: [''],
      pan_no: ['', [Validators.required]],
      bank_account_name: ['', [Validators.required]],
      bank_account_number: ['', [Validators.required]],
      bank_name: ['', [Validators.required]],
      bank_ifsc: ['', [Validators.required]],
      bank_account_type: ['', [Validators.required]],
      name_pan_card: ['', [Validators.required]],
      onboarder_id: [''],
      termsAndConditions: [false, [Validators.requiredTrue]]
    });

    this._subscription.add(
      this.regForm.get('has_gst').valueChanges.subscribe( val => {
        if (val) {
          this.regForm.get('gst_no').setValidators([Validators.required]);
        } else {
          this.regForm.get('gst_no').clearValidators();
        }
        this.regForm.updateValueAndValidity();
      })
    );

    this._subscription.add(
      this.regForm.get('selfOnboarded').valueChanges.subscribe( val => {
        if (val === false) {
          this.regForm.get('onboarder_id').setValidators([Validators.required]);
        } else if (val === true) {
          this.regForm.get('onboarder_id').clearValidators();
        }
        this.regForm.updateValueAndValidity();
      })
    );
  }

  public verifyEmail(event): void {
    event.preventDefault();
    this.loadingEmailVerification = true;
    const email = this.regForm.value.email_id;
    if (!email) {
      this.regForm.get('email_id').setErrors({required: true});
      this.loadingEmailVerification = false;
      return;
    }
    this._store.dispatch(fromAuthActions.generateOtp({email}));
  }

  public emailVerification(): void {
    this._subscription.add(this.generateOtp$.subscribe((registered) => {
        this.loadingEmailVerification = false;
        if (registered.message === 'Success') {
          this.emailVerificationSuccessful = registered.email_id;
        } else {
          this.emailVerificationSuccessful = '';
          this.regForm.get('email_id').setErrors({InvalidValue: true});
        }
      },
      () => {
        this.loadingEmailVerification = false;
        this.regForm.get('email_id').setErrors({InvalidValue: true});
        this.emailVerificationSuccessful = '';
      })
    );
  }

  public supplierRegistration(): void {
    this._subscription.add(this.isAuthError$.subscribe(() => this.loading = false));
    this._subscription.add(this.isProductError$.subscribe(() => this.loading = false));
    this._subscription.add(this.registrationResponse$.subscribe(() => {
      this.loading = false;
      const msg = `You've successfully registered. Please login with your email and password`;
      this._snackBar.open(msg, '', {duration: 3000});
      this._router.navigate(['auth/login']);
    }));
  }

}

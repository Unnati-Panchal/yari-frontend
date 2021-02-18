import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromProductsActions from '~store/products/products.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProductsSelectors from '~store/products/products.selectors';

import {CustomValidator} from '@yaari/utils/custom-validators';
import {ICategory} from '@yaari/models/product/product.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationResponse$ = this._store.pipe(select(fromAuthSelectors.getRegResponse), filter(value => !!value));
  public isAuthError$ = this._store.pipe(select(fromAuthSelectors.getIsError), filter(error => !!error));
  public isProductError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(error => !!error));
  public categories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(categories => !!categories?.length));
  public panVerification$ = this._store.pipe(select(fromAuthSelectors.panVerification), filter(value => !!value));
  public gstVerification$ = this._store.pipe(select(fromAuthSelectors.gstVerification), filter(value => !!value));
  public generateOtp$ = this._store.pipe(select(fromAuthSelectors.generateOtp), filter(value => !!value));
  public verifyOtpResponse$ = this._store.pipe(select(fromAuthSelectors.verifyOtpResponse), filter(value => !!value));
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
  public loadingGstVerification: boolean;
  public loadingOtpVerification: boolean;
  public loadingPanVerification: boolean;
  public otpVerificationSuccessful: string;
  public emailVerificationSuccessful: string;
  public gstVerificationSuccessful: string;
  public gstVerificationFailureReason: string;
  public panVerificationSuccessful: string;
  public panVerificationFailureReason: string;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router
  ) {
  }

  public ngOnInit(): void {
    this.initRegistrationForm();
    this.supplierRegistration();
    this.emailVerification();
    this.otpVerification();
    this.gstVerification();
    this.panVerification();
    this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    this._store.dispatch(fromAuthActions.getOnboarders());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public registerSupplier(): void {
    this.loading = true;
    this.regForm.updateValueAndValidity();
    if (!this.regForm.valid) {
      this.loading = false;
      return;
    }
    if (!this.emailVerificationSuccessful) {
      this.loading = false;
      this.regForm.get('email_id').setErrors({InvalidValue: true});
      return;
    }
    if (!this.panVerificationSuccessful) {
      this.loading = false;
      this.regForm.get('pan_no').setErrors({InvalidValue: true});
      return;
    }
    if (!this.gstVerificationSuccessful) {
      this.loading = false;
      this.regForm.get('gst_no').setErrors({InvalidValue: true});
      return;
    }
    if (!this.gstVerificationSuccessful) {
      this.loading = false;
      this.regForm.get('gst_no').setErrors({InvalidValue: true});
      return;
    }
    if (!this.otpVerificationSuccessful) {
      this.loading = false;
      this.regForm.get('otp_no').setErrors({InvalidValue: true});
      return;
    }
    const regRequest = this.regForm.value;
    regRequest.email_id = this.emailVerificationSuccessful;
    regRequest.pan_no = this.panVerificationSuccessful;
    regRequest.gst_no = this.gstVerificationSuccessful;
    this._store.dispatch(fromAuthActions.registration({regRequest}));
  }

  public initRegistrationForm(): void {
    this.regForm = this._formBuilder.group({
      is_active: [true],
      password: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      phone_no: ['', [Validators.required, CustomValidator.digitsOnly]],
      email_id: ['', [Validators.required, Validators.email]],
      otp_no: ['', [Validators.required]],
      city: ['', [Validators.required, CustomValidator.lettersOnly]],
      state: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price_range_min: ['', [Validators.required, CustomValidator.digitsOnly]],
      price_range_max: ['', [Validators.required, CustomValidator.digitsOnly]],
      average_monthly_stock: ['', [Validators.required, CustomValidator.digitsOnly]],
      primary_category_id: ['', [Validators.required]],
      has_gst: ['', [Validators.required]],
      gst_no: [''],
      pan_no: ['', [Validators.required]],
      bank_account_name: ['', [Validators.required]],
      bank_account_number: ['', [Validators.required]],
      bank_name: ['', [Validators.required]],
      bank_ifsc: ['', [Validators.required]],
      bank_account_type: ['', [Validators.required]],
      name_pan_card: ['', [Validators.required]],
      onboarder_id: ['', [Validators.required]]
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
  }

  public verifyOtp(event): void {
    event.preventDefault();
    this.loadingOtpVerification = true;
    const email = this.regForm.value.email_id;
    const otp = this.regForm.value.otp_no;
    if (!email) {
      this.regForm.get('email_id').setErrors({required: true});
      this.loadingOtpVerification = false;
      return;
    }
    if (!otp) {
      this.regForm.get('otp_no').setErrors({required: true});
      this.loadingOtpVerification = false;
      return;
    }
    const verifyOtp = {email, otp};
    this._store.dispatch(fromAuthActions.verifyOtp({verifyOtp}));
  }

  public otpVerification(): void {
    this._subscription.add(this.verifyOtpResponse$.subscribe((registered) => {
        this.loadingOtpVerification = false;
        if (registered.message === 'Success') {
          this.otpVerificationSuccessful = registered.email_id;
        } else {
          this.otpVerificationSuccessful = '';
          this.regForm.get('otp_no').setErrors({InvalidValue: true});
        }
      },
      () => {
        this.loadingOtpVerification = false;
        this.regForm.get('otp_no').setErrors({InvalidValue: true});
        this.otpVerificationSuccessful = '';
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

  public verifyGst(event): void {
    event.preventDefault();
    this.loadingGstVerification = true;
    const gstReq = {
      gst_no: this.regForm.value.gst_no,
      name: this.regForm.value.contact_person
    };
    this._store.dispatch(fromAuthActions.gstVerification({gstReq}));
  }

  public gstVerification(): void {
    this._subscription.add(this.gstVerification$.subscribe((registered) => {
        this.loadingGstVerification = false;
        if (registered.details === 'GST Verified') {
          this.gstVerificationSuccessful = registered.gst_no;
        } else {
          this.gstVerificationSuccessful = '';
          this.regForm.get('gst_no').setErrors({InvalidValue: true});
          this.gstVerificationFailureReason = registered.details;
        }
      },
      (error) => {
        this.loadingGstVerification = false;
        this.regForm.get('gst_no').setErrors({InvalidValue: true});
        this.gstVerificationSuccessful = '';
        this.gstVerificationFailureReason = error.details;
      })
    );
  }

  public verifyPan(event): void {
    event.preventDefault();
    this.loadingPanVerification = true;
    const panReq = {
      pan_no: this.regForm.value.pan_no,
      name: this.regForm.value.contact_person
    };
    this._store.dispatch(fromAuthActions.panVerification({panReq}));
  }

  public panVerification(): void {
    this._subscription.add(this.panVerification$.subscribe((registered) => {
        this.loadingPanVerification = false;
        if (registered.details === 'PAN Verified') {
          this.panVerificationSuccessful = registered.pan_no;
        } else {
          this.panVerificationSuccessful = '';
          this.regForm.get('pan_no').setErrors({InvalidValue: true});
          this.panVerificationFailureReason = registered.details;
        }
      },
      (error) => {
        this.loadingPanVerification = false;
        this.regForm.get('pan_no').setErrors({InvalidValue: true});
        this.panVerificationSuccessful = '';
        this.panVerificationFailureReason = error.details;
      })
    );
  }

  public supplierRegistration(): void {
    this._subscription.add(this.isAuthError$.subscribe(error => console.log(error)));
    this._subscription.add(this.isProductError$.subscribe(error => console.log(error)));
    this._subscription.add(this.registrationResponse$.subscribe(() => {
      this.loading = false;
      this._router.navigate(['app/dashboard']);
    }));
  }

}

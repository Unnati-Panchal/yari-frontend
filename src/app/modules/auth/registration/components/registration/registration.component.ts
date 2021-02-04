import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromProductsActions from '~store/products/products.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProductsSelectors from '~store/products/products.selectors';

import {CustomValidator} from '@yaari/utils/custom-validators';
import {ICategory} from '@yaari/models/product/product.interface';
import {IRegistration, IVerifyOtp} from '@yaari/models/auth/auth.interface';
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
  public submitKYCForVerificationResponse$ = this._store.pipe(
    select(fromAuthSelectors.submitKYCForVerificationResponse),
    filter(value => !!value)
  );
  public panVerification$ = this._store.pipe(select(fromAuthSelectors.panVerification), filter(value => !!value));
  public gstVerification$ = this._store.pipe(select(fromAuthSelectors.gstVerification), filter(value => !!value));
  public bankVerification$ = this._store.pipe(select(fromAuthSelectors.bankVerification), filter(value => !!value));
  public generateOtp$ = this._store.pipe(select(fromAuthSelectors.generateOtp), filter(value => !!value));
  public verifyOtpResponse$ = this._store.pipe(select(fromAuthSelectors.verifyOtpResponse), filter(value => !!value));
  public approveKYCResponse$ = this._store.pipe(select(fromAuthSelectors.approveKYCResponse), filter(value => !!value));
  public regForm: FormGroup;
  public types = [
    {label: 'Retailer', key: 'retailer'},
    {label: 'Manufacturer', key: 'manufacturer'},
    {label: 'Wholesaler', key: 'wholesaler'}
  ];
  public categories: ICategory[];
  public loading;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router
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
    this.loading = true;
    this.regForm.updateValueAndValidity();
    if (!this.regForm.valid) {
      this.loading = false;
      return;
    }
    const KYCVerification: IRegistration = this.regForm.value;
    this._store.dispatch(fromAuthActions.submitKYCForVerification({KYCVerification}));
  }

  public initRegistrationForm(): void {
    this.regForm = this._formBuilder.group({
      is_active: [true],
      password: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      phone_no: ['', [Validators.required, CustomValidator.digitsOnly]],
      email_id: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, CustomValidator.lettersOnly]],
      type: ['', [Validators.required]],
      price_range_min: ['', [Validators.required, CustomValidator.digitsOnly]],
      price_range_max: ['', [Validators.required, CustomValidator.digitsOnly]],
      average_monthly_stock: ['', [Validators.required, CustomValidator.digitsOnly]],
      primary_category_id: ['', [Validators.required]],
      gst_no: ['', [Validators.required]],
      pan_no: ['', [Validators.required]],
      bank_account_name: ['', [Validators.required]],
      bank_account_number: ['', [Validators.required]],
      bank_name: ['', [Validators.required]],
      bank_ifsc: ['', [Validators.required]],
      bank_account_type: ['', [Validators.required]]
    });
  }

  public supplierRegistration(): void {
    this._subscription.add(this.isAuthError$.subscribe(error => console.log(error)));
    this._subscription.add(this.isProductError$.subscribe(error => console.log(error)));
    this._subscription.add(this.submitKYCForVerificationResponse$.subscribe((registered) => {
      console.log(registered);
      // this._store.dispatch(fromAuthActions.panVerification());
      // this._store.dispatch(fromAuthActions.gstVerification());
      // this._store.dispatch(fromAuthActions.bankVerification());
      // this._store.dispatch(fromAuthActions.generateOtp());
    }));

    this._subscription.add(
      combineLatest([
        this.panVerification$,
        this.gstVerification$,
        this.bankVerification$,
        this.generateOtp$
      ]).subscribe(([panVerification, gstVerification, bankVerification, generateOtp]) => {
        if (generateOtp) {
          console.log(generateOtp);
          this.regForm.get('email_id').setErrors({InvalidValue: true});

          // const verifyOtp: IVerifyOtp = null;
          // this._store.dispatch(fromAuthActions.verifyOtp({verifyOtp}));
        }
        if (panVerification) {
          console.log(panVerification);
          this.regForm.get('pan_no').setErrors({InvalidValue: true});
        }
        if (gstVerification) {
          console.log(gstVerification);
          this.regForm.get('gst_no').setErrors({InvalidValue: true});
        }
        if (bankVerification) {
          console.log(bankVerification);
          this.regForm.get('bank_account_number').setErrors({InvalidValue: true});
        }
        this.KYCApprove();
      })
    );

    this._subscription.add(this.verifyOtpResponse$.subscribe((registered) => {
      console.log(registered);
      this.KYCApprove();
    }));

    this._subscription.add(this.approveKYCResponse$.subscribe((registered) => {
      console.log(registered);
      const regRequest = this.regForm.value;
      this._store.dispatch(fromAuthActions.registration({regRequest}));
    }));

    this._subscription.add(this.registrationResponse$.subscribe((registered) => {
      console.log(registered);
      this.loading = false;
      this._router.navigate(['app/dashboard']);
    }));
  }

  public KYCApprove(): void {
    this.regForm.updateValueAndValidity();
    if (!this.regForm.valid) {
      this.loading = false;
      return;
    }
    const approveKYC = this.regForm.value;
    this._store.dispatch(fromAuthActions.approveKYC({approveKYC}));
  }

}

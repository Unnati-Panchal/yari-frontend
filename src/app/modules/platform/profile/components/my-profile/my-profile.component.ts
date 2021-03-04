import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProductsActions from '~store/products/products.actions';

import {CustomValidator} from '@yaari/utils/custom-validators';
import {IEditSupplierProfile} from '@yaari/models/auth/auth.interface';
import * as fromProductsSelectors from '~store/products/products.selectors';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  public isAuthError$ = this._store.pipe(select(fromAuthSelectors.getIsError), filter(error => !!error));
  public supplierDetails$ = this._store.pipe(select(fromAuthSelectors.supplierDetails$), filter(d => !!d));
  public getRegResponse$ = this._store.pipe(select(fromAuthSelectors.getRegResponse), filter(d => !!d));
  public url$ = this._store.pipe(select(fromAuthSelectors.url$), filter(d => !!d));
  public categories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(categories => !!categories?.length));
  public generateOtp$ = this._store.pipe(select(fromAuthSelectors.generateOtp), filter(value => !!value));
  public regForm: FormGroup;
  public loading;
  public isEditEnabled: boolean;
  public profileImage: string;
  public loadingEmailVerification: boolean;
  public emailVerificationSuccessful: string;
  public types = [
    {label: 'Retailer', key: 'retailer'},
    {label: 'Manufacturer', key: 'manufacturer'},
    {label: 'Wholesaler', key: 'wholesaler'}
  ];

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router
  ) {
  }

  public ngOnInit(): void {
    this.loading = true;
    this.initRegistrationForm();
    this.supplierRegistration();
    this.emailVerification();
    this._store.dispatch(fromAuthActions.supplierDetails());
    this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
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

    const supplierProfileChanges: IEditSupplierProfile = this.regForm.value;
    this._store.dispatch(fromAuthActions.editSupplier({supplierProfileChanges}));
  }

  public initRegistrationForm(): void {
    this.regForm = this._formBuilder.group({
      contact_person: ['', [Validators.required]],
      phone_no: ['', [Validators.required, CustomValidator.digitsOnly]],
      email_id: ['', [Validators.required, Validators.email]],
      gst_no: [''],
      pan_no: [''],
      otp: [''],
      type: ['', [Validators.required]],
      bank_account_name: [''],
      bank_account_number: [''],
      bank_name: [''],
      bank_ifsc: [''],
      name_pan_card: [''],
      primary_category_name: ['', [Validators.required]]
    });

    if (!this.isEditEnabled) {
      this.regForm.disable();
    }
  }

  public supplierRegistration(): void {
    this._subscription.add(this.isAuthError$.subscribe(() => this.loading = false));
    this._subscription.add(this.supplierDetails$.subscribe(details => {
      this.profileImage = details?.profile_image;
      if (!this.profileImage) {
        this.profileImage = '/assets/images/registration.png';
      }
      this.regForm.get('contact_person').patchValue(details?.contact_person);
      this.regForm.get('phone_no').patchValue(details?.phone_no);
      this.regForm.get('email_id').patchValue(details?.email_id);
      this.regForm.get('gst_no').patchValue(details?.gst_no);
      this.regForm.get('pan_no').patchValue(details?.pan_no);
      this.regForm.get('type').patchValue(details?.type);
      this.regForm.get('bank_account_name').patchValue(details?.bank_account_name);
      this.regForm.get('bank_account_number').patchValue(details?.bank_account_number);
      this.regForm.get('bank_name').patchValue(details?.bank_name);
      this.regForm.get('bank_ifsc').patchValue(details?.bank_ifsc);
      this.regForm.get('name_pan_card').patchValue(details?.name_pan_card);
      this.regForm.get('primary_category_name').patchValue(details?.primary_category_name);
      this.loading = false;
    }));

    this._subscription.add(this.getRegResponse$.subscribe(() => {
      this._store.dispatch(fromAuthActions.supplierDetails());
      this.loading = false;
    }));

    this._subscription.add(this.url$.subscribe(() => {
      this._store.dispatch(fromAuthActions.supplierDetails());
      this.loading = false;
    }));
  }

  public enableEditing(): void {
    this.regForm.get('contact_person').enable();
    this.regForm.get('phone_no').enable();
    this.regForm.get('email_id').enable();
    this.regForm.get('primary_category_name').enable();
    this.regForm.get('type').enable();
    this.regForm.get('otp').enable();
    this.isEditEnabled = true;
  }

  public disableEditing(): void {
    this.regForm.disable();
    this.isEditEnabled = false;
  }

  public uploadProfileImage(fileUpload: File): void {
    this.loading = true;
    this._store.dispatch(fromAuthActions.uploadSupplierPicture({fileUpload}));
  }

  public fileBrowseHandler(files): void {
    this.uploadProfileImage(files[0]);
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
}

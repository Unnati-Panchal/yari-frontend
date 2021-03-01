import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

import {CustomValidator} from '@yaari/utils/custom-validators';
import {IEditSupplierProfile} from '@yaari/models/auth/auth.interface';

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
  public regForm: FormGroup;
  public loading;
  public isEditEnabled: boolean;
  public profileImage: string;

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
    this._store.dispatch(fromAuthActions.supplierDetails());
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
      type: [''],
      bank_account_name: ['', [Validators.required]],
      bank_account_number: ['', [Validators.required]],
      bank_name: ['', [Validators.required]],
      bank_ifsc: ['', [Validators.required]],
      name_pan_card: ['', [Validators.required]]
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
      this.regForm.get('contact_person').patchValue(details.contact_person);
      this.regForm.get('phone_no').patchValue(details.phone_no);
      this.regForm.get('email_id').patchValue(details.email_id);
      this.regForm.get('gst_no').patchValue(details.gst_no);
      this.regForm.get('type').patchValue(details.type);
      this.regForm.get('bank_account_name').patchValue(details.bank_account_name);
      this.regForm.get('bank_account_number').patchValue(details.bank_account_number);
      this.regForm.get('bank_name').patchValue(details.bank_name);
      this.regForm.get('bank_ifsc').patchValue(details.bank_ifsc);
      this.regForm.get('name_pan_card').patchValue(details.name_pan_card);
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
    this.regForm.get('phone_no').enable();
    this.regForm.get('email_id').enable();
    this.isEditEnabled = true;
  }

  public uploadProfileImage(fileUpload: File): void {
    this.loading = true;
    this._store.dispatch(fromAuthActions.uploadSupplierPicture({fileUpload}));
  }

  fileBrowseHandler(files): void {
    this.uploadProfileImage(files[0]);
  }

}

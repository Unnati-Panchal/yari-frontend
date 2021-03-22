import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {CustomValidator} from '@yaari/utils/custom-validators';
import * as fromProfileActions from '~store/profile/profile.actions';
import {IPickupAddress} from '@yaari/models/profile/profile.interface';


@Component({
  selector: 'app-pickup-address',
  templateUrl: './pickup-address.component.html',
  styleUrls: ['./pickup-address.component.scss']
})
export class PickupAddressComponent implements OnInit, OnDestroy {
  public isPickupAddress$ = this._store.pipe(select(fromProfileSelectors.getPickupAddress$), filter(address => !!address));
  public isError$ = this._store.pipe(select(fromProfileSelectors.getIsError$), filter(error => !!error));
  public regForm: FormGroup;
  public loading;
  public submitted: boolean;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _router: Router
  ) {
  }

  public ngOnInit(): void {
    this.loading = true;
    this.initAddressForm();
    this.pickupAddressSub();
    this._store.dispatch(fromProfileActions.getPickupAddress());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public updatePickupAddress(): void {
    this.loading = true;
    this.regForm.updateValueAndValidity();
    if (!this.regForm.valid) {
      this.loading = false;
      return;
    }

    this.submitted = true;
    const pickupAddress: IPickupAddress = this.regForm.value;
    this._store.dispatch(fromProfileActions.addPickupAddress({pickupAddress}));
  }

  public initAddressForm(): void {
    this.regForm = this._formBuilder.group({
      full_name: ['', [Validators.required]],
      phone_no: ['', [Validators.required, CustomValidator.digitsOnly]],
      country: ['', [Validators.required]],
      pin_code: ['', [Validators.required]],
      line_one: ['', [Validators.required]],
      line_two: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  public pickupAddressSub(): void {
    this._subscription.add(this.isError$.subscribe(() => this.loading = false));
    this._subscription.add(this.isPickupAddress$.subscribe(address => {
      this.regForm.get('full_name').patchValue(address?.full_name);
      this.regForm.get('phone_no').patchValue(address?.phone_no);
      this.regForm.get('country').patchValue(address?.country);
      this.regForm.get('pin_code').patchValue(address?.pin_code);
      this.regForm.get('line_one').patchValue(address?.line_one);
      this.regForm.get('line_two').patchValue(address?.line_two);
      this.regForm.get('landmark').patchValue(address?.landmark);
      this.regForm.get('city').patchValue(address?.city);
      this.regForm.get('state').patchValue(address?.state);
      this.regForm.get('type').patchValue(address?.type);
      this.loading = false;
      if (address && this.submitted) {
        this._router.navigate(['app/dashboard']);
      }
    }));
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit, OnDestroy {
  public accountRecoveryForm: FormGroup;
  public hide: boolean;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public supplierLogin(): void {
    const email = this.accountRecoveryForm.value.email;
    this._store.dispatch(fromAuthActions.passwordRecovery({ email }));
  }

  public initForm(): void {
    this.accountRecoveryForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
}

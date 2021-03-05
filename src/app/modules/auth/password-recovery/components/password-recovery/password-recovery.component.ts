import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {AppFacade, IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit, OnDestroy {
  public accountRecoveryForm: FormGroup;
  public hide: boolean;
  public loading: boolean;
  public errors: string;
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    filter(error => !!error)
  );

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _appFacade: AppFacade
  ) {
  }

  public ngOnInit(): void {
    this._appFacade.clearMessages();
    this.initForm();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public supplierLogin(): void {
    const email = this.accountRecoveryForm.value.email;
    this.loading = true;
    this.accountRecoveryForm.updateValueAndValidity();
    if (!email) {
      this.loading = false;
      return;
    }
    this._store.dispatch(fromAuthActions.passwordRecovery({ email }));
  }

  public initForm(): void {
    this.accountRecoveryForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      user_role: 'supplier' // 'supplier' / 'admin'
    });
    this._subscription.add(
      this.isError$.subscribe( (error) => {
        this.errors = error.error.detail;
        this.loading = false;
        this.accountRecoveryForm.get('email').setErrors({notExist: true});
      })
    );
  }
}

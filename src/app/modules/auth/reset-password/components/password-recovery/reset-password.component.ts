import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {AppFacade, IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {filter, tap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPassForm: FormGroup;
  public hide: boolean;
  public loading: boolean;
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    filter(error => !!error),
    tap(() => this.loading = false)
  );
  public isSuccessMsg$ = this._store.pipe(
    select(fromAuthSelectors.getIsMsg$),
    filter(msg => !!msg),
    tap(() => this.loading = false)
  );

  private _subscription: Subscription = new Subscription();
  private _token: string;

  constructor(private _store: Store<IAppState>,
              private _formBuilder: FormBuilder,
              private _appFacade: AppFacade,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    this._appFacade.clearMessages();
    this.initForm();
    this._activatedRoute.queryParams.subscribe(params => this._token = params.token);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public resetPass(): void {
    this.loading = true;
    this.resetPassForm.updateValueAndValidity();
    if (!this.resetPassForm.value.password) {
      this.loading = false;
      return;
    }
    if (this.resetPassForm.value.password !== this.resetPassForm.value.repeatPassword) {
      this.resetPassForm.get('repeatPassword').setErrors({notMatch: true});
      this.loading = false;
      return;
    } else {
      this.resetPassForm.get('repeatPassword').setErrors(null);
    }
    const resetPasswordInfo = {
      access_token: this._token,
      new_password: this.resetPassForm.value.password
    };
    this._store.dispatch(fromAuthActions.resetPassword({ resetPasswordInfo }));
  }

  public initForm(): void {
    this.resetPassForm = this._formBuilder.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });

    this._subscription.add(
      this.isSuccessMsg$.subscribe( (msg) => {
        this._snackBar.open(msg, '', {duration: 3000});
        this._router.navigate(['auth/login']);
      })
    );
  }
}

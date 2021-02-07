import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromAuthActions from '~store/auth/auth.actions';

import {AuthService} from '@yaari/services/auth/auth.service';
import {
  ILogin,
  IRegistration,
  ISubmitKYCForVerificationResponse,
  IToken, IVerifyGstPan,
  IVerifyOtp,
  KYCDetailsResponse
} from '@yaari/models/auth/auth.interface';

@Injectable()
export class AuthEffects {
  public registerSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.registration),
      map(action => action.regRequest),
      switchMap((regRequest: IRegistration) =>
        this._authService.registerSupplier(regRequest).pipe(
          map((regResponse: IRegistration) => fromAuthActions.registrationSuccess({ regResponse })),
          catchError(error => of(fromAuthActions.registrationError({ error })))
        )
      )
    )
  );

  public loginSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.login),
      map(action => action.loginRequest),
      switchMap((loginRequest: ILogin) =>
        this._authService.login(loginRequest).pipe(
          map((token: IToken) => fromAuthActions.loginSuccess({ token })),
          catchError(error => of(fromAuthActions.loginError({ error })))
        )
      )
    )
  );

  public accountRecovery$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.passwordRecovery),
      map(action => action.email),
      switchMap((email: string) =>
        this._authService.passwordRecovery(email).pipe(
          map((passwordRecoveryResponse: string) => fromAuthActions.passwordRecoverySuccess({ passwordRecoveryResponse })),
          catchError(error => of(fromAuthActions.passwordRecoveryError({ error })))
        )
      )
    )
  );

  public submitKYCForVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.submitKYCForVerification),
      map(action => action.KYCVerification),
      switchMap((reg: IRegistration) =>
        this._authService.submitKYCForVerification(reg).pipe(
          map((submitKYCForVerificationResponse: ISubmitKYCForVerificationResponse) =>
            fromAuthActions.submitKYCForVerificationSuccess({ submitKYCForVerificationResponse })),
          catchError(error => of(fromAuthActions.submitKYCForVerificationError({ error })))
        )
      )
    )
  );

  public panVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.panVerification),
      map(action => action.panReq),
      switchMap((panReq: IVerifyGstPan) =>
        this._authService.panVerification(panReq).pipe(
          map((panVerification: KYCDetailsResponse) => fromAuthActions.panVerificationSuccess({ panVerification })),
          catchError(error => of(fromAuthActions.panVerificationError({ error })))
        )
      )
    )
  );

  public gstVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.gstVerification),
      map(action => action.gstReq),
      switchMap((gstReq: IVerifyGstPan) =>
        this._authService.gstVerification(gstReq).pipe(
          map((gstVerification: KYCDetailsResponse) => fromAuthActions.gstVerificationSuccess({ gstVerification })),
          catchError(error => of(fromAuthActions.gstVerificationError({ error })))
        )
      )
    )
  );

  public bankVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.bankVerification),
      switchMap(() =>
        this._authService.bankVerification().pipe(
          map((bankVerification: KYCDetailsResponse) => fromAuthActions.bankVerificationSuccess({ bankVerification })),
          catchError(error => of(fromAuthActions.bankVerificationError({ error })))
        )
      )
    )
  );

  public generateOtp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.generateOtp),
      map(action => action.email),
      switchMap((email: string) =>
        this._authService.generateOtp(email).pipe(
          map((generateOtp: KYCDetailsResponse) => fromAuthActions.generateOtpSuccess({ generateOtp })),
          catchError(error => of(fromAuthActions.generateOtpError({ error })))
        )
      )
    )
  );

  public verifyOtp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.verifyOtp),
      map(action => action.verifyOtp),
      switchMap((verifyOtp: IVerifyOtp) =>
        this._authService.verifyOtp(verifyOtp).pipe(
          map((verifyOtpResponse: KYCDetailsResponse) => fromAuthActions.verifyOtpSuccess({ verifyOtpResponse })),
          catchError(error => of(fromAuthActions.verifyOtpError({ error })))
        )
      )
    )
  );

  public approveKYC$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.approveKYC),
      map(action => action.approveKYC),
      switchMap((approveKYC: IRegistration) =>
        this._authService.approveKYC(approveKYC).pipe(
          map((approveKYCResponse: IRegistration) => fromAuthActions.approveKYCSuccess({ approveKYCResponse })),
          catchError(error => of(fromAuthActions.approveKYCError({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

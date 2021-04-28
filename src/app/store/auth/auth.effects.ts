import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromAuthActions from '~store/auth/auth.actions';

import {AuthService} from '@yaari/services/auth/auth.service';
import {
  IAdminDetails,
  IEditSupplierProfile,
  ILogin,
  IOnboarders,
  IRegistration, IResetPassword,
  ISubmitKYCForVerificationResponse,
  IToken,
  IVerifyGstPan,
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

  public editSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.editSupplier),
      map(action => action.supplierProfileChanges),
      switchMap((supplierProfileChanges: IEditSupplierProfile) =>
        this._authService.editSupplier(supplierProfileChanges).pipe(
          map((regResponse: IRegistration) => fromAuthActions.editSupplierSuccess({ regResponse })),
          catchError(error => of(fromAuthActions.editSupplierError({ error })))
        )
      )
    )
  );

  public supplierDetails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.supplierDetails),
      switchMap(() =>
        this._authService.supplierDetails().pipe(
          map((supplierDetails: IRegistration) => fromAuthActions.supplierDetailsSuccess({ supplierDetails })),
          catchError(error => of(fromAuthActions.supplierDetailsError({ error })))
        )
      )
    )
  );

  public adminDetails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.adminDetails),
      switchMap(() =>
        this._authService.adminDetails().pipe(
          map((adminDetails: IAdminDetails) => fromAuthActions.adminDetailsSuccess({ adminDetails })),
          catchError(error => of(fromAuthActions.adminDetailsError({ error })))
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
          map(({msg}) => fromAuthActions.passwordRecoverySuccess({ msg })),
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

  public getOnboarders$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.getOnboarders),
      switchMap(() =>
        this._authService.getOnboarders().pipe(
          map((onBoarders: IOnboarders[]) => fromAuthActions.getOnboardersSuccess({ onBoarders })),
          catchError(error => of(fromAuthActions.getOnboardersError({ error })))
        )
      )
    )
  );

  public uploadSupplierPicture$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.uploadSupplierPicture),
      map(action => action.fileUpload),
      switchMap((fileUpload: File) =>
        this._authService.uploadSupplierPicture(fileUpload).pipe(
          map(({url}) => fromAuthActions.uploadSupplierPictureSuccess({ url })),
          catchError(error => of(fromAuthActions.uploadSupplierPictureError(error)))
        )
      )
    )
  );

  public resetPassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthActions.resetPassword),
      map(action => action.resetPasswordInfo),
      switchMap((resetPassword: IResetPassword) =>
        this._authService.resetPassword(resetPassword).pipe(
          map(({msg}) => fromAuthActions.resetPasswordSuccess({ msg })),
          catchError(error => of(fromAuthActions.resetPasswordError(error)))
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

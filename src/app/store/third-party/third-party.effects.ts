import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromThirdPartyActions from '~store/third-party/third-party.actions';
import {ThirdPartyService} from '@yaari/services/third-party/third-party.service';
import {IGstPanResponse} from '@yaari/models/third-party/third-party.interface';

@Injectable()
export class ThirdPartyEffects {
  public emailVerification$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromThirdPartyActions.emailVerification),
      map(action => action.email),
      switchMap((email: string) =>
        this._thirdPartyService.emailVerification(email).pipe(
          map((emailVerificationResponse: IGstPanResponse) =>
            fromThirdPartyActions.emailVerificationSuccess({ emailVerificationResponse })),
          catchError(error => of(fromThirdPartyActions.emailVerificationError({ error })))
        )
      )
    )
  );

  public uploadGstCertificate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromThirdPartyActions.uploadGstCertificate),
      map(action => action.certificate),
      switchMap((certificate: string) =>
        this._thirdPartyService.uploadGstCertificate(certificate).pipe(
          map((uploadedGstCertificate: IGstPanResponse) =>
            fromThirdPartyActions.uploadGstCertificateSuccess({ uploadedGstCertificate })),
          catchError(error => of(fromThirdPartyActions.uploadGstCertificateError({ error })))
        )
      )
    )
  );

  public uploadPanCard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromThirdPartyActions.uploadPanCard),
      map(action => action.panCard),
      switchMap((panCard: number) =>
        this._thirdPartyService.uploadPanCard(panCard).pipe(
          map((uploadedPanCard: IGstPanResponse) =>
            fromThirdPartyActions.uploadPanCardSuccess({ uploadedPanCard })),
          catchError(error => of(fromThirdPartyActions.uploadPanCardError({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _thirdPartyService: ThirdPartyService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

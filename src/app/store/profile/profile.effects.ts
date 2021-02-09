import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromProfileActions from '~store/profile/profile.actions';
import {ProfileService} from '@yaari/services/profile/profile.service';
import {IBucket} from '@yaari/models/profile/profile.interface';

@Injectable()
export class ProfileEffects {
  public getBuckets$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getBuckets),
      switchMap(() =>
        this._profileService.getBuckets().pipe(
          map((buckets: IBucket[]) => fromProfileActions.getBucketsSuccess({ buckets })),
          catchError(error => of(fromProfileActions.getBucketsError({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _profileService: ProfileService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromProfileActions from '~store/profile/profile.actions';

import {IBucket} from '@yaari/models/profile/profile.interface';

export const profileFeatureKey = 'profile';

export interface IProfileState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  buckets: IBucket[];
}

export const profileInitialState: IProfileState = {
  loading: false,
  error: null,
  buckets: []
};

const profileReducer = createReducer(
  profileInitialState,
  on(fromProfileActions.getBuckets, (state) => ({...state, loading: true})),
  on(fromProfileActions.getBucketsSuccess, (state, action) => ({
    ...state,
    loading: false,
    buckets: action.buckets
  })),
  on(fromProfileActions.getBucketsError, (state, action) => ({ ...state, loading: false, error: action.error })),

);

// tslint:disable-next-line:typedef
export function reducer(state: IProfileState | undefined, action: Action) {
  return profileReducer(state, action);
}

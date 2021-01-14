import { Action, createReducer, on } from '@ngrx/store';

import * as fromRoot from '~store/app.state';
import * as fromActions from '~store/auth/auth.actions';

export const authFeatureKey = 'auth';

export interface IAuthState extends fromRoot.IAppState {
  isLoading: boolean;
  isError: boolean;
}

export const authInitialState: IAuthState = {
  isLoading: false,
  isError: false
};

const authReducer = createReducer(
  authInitialState,
  on(fromActions.clearState, state => ({ ...state, isLoading: false, isError: false })),
);

// tslint:disable-next-line:typedef
export function reducer(state: IAuthState | undefined, action: Action) {
  return authReducer(state, action);
}

// tslint:disable-next-line:typedef
export function clearState(red: (state: {}, action: Action) => any) {
  return (state: {}, action: Action) => {
    if (action.type === fromActions.clearState.type) {
      state = undefined;
    }
    return red(state, action);
  };
}

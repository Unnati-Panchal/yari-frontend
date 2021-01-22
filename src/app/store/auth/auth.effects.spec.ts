import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

import * as fromAuthReducer from '~store/auth/auth.reducer';
import * as fromRoot from '~store/app.state';

import {AuthEffects} from '~store/auth/auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let store: MockStore<fromRoot.IAppState>;

  const initialState: fromRoot.IAppState = fromAuthReducer.authInitialState;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject<AuthEffects>(AuthEffects);
    store = TestBed.inject<MockStore<fromRoot.IAppState>>(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

import * as fromProfileReducer from '~store/profile/profile.reducer';
import * as fromRoot from '~store/app.state';
import {ProfileEffects} from '~store/profile/profile.effects';

describe('ProfileEffects', () => {
  let effects: ProfileEffects;
  let store: MockStore<fromRoot.IAppState>;

  const initialState: fromRoot.IAppState = fromProfileReducer.profileInitialState;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject<ProfileEffects>(ProfileEffects);
    store = TestBed.inject<MockStore<fromRoot.IAppState>>(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});

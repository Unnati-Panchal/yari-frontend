import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

import * as fromThirdPartyReducer from '~store/third-party/third-party.reducer';
import * as fromRoot from '~store/app.state';
import {ThirdPartyEffects} from '~store/third-party/third-party.effects';

describe('ThirdPartyEffects', () => {
  let effects: ThirdPartyEffects;
  let store: MockStore<fromRoot.IAppState>;

  const initialState: fromRoot.IAppState = fromThirdPartyReducer.thirdPartyInitialState;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ThirdPartyEffects,
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject<ThirdPartyEffects>(ThirdPartyEffects);
    store = TestBed.inject<MockStore<fromRoot.IAppState>>(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});

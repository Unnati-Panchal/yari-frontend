import { TestBed } from '@angular/core/testing';
import * as fromRoot from '~store/app.state';

import * as fromAdminReducer from '~store/admin/admin.reducer';

import { AdminEffects } from './admin.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AdminEffects', () => {
  let effects: AdminEffects;
  let store: MockStore<fromRoot.IAppState>;

  const initialState: fromRoot.IAppState = fromAdminReducer.adminInitialState;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AdminEffects,
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject<AdminEffects>(AdminEffects);
    store = TestBed.inject<MockStore<fromRoot.IAppState>>(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

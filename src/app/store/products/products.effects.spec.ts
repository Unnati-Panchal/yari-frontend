import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

import * as fromProductsReducer from '~store/products/products.reducer';
import * as fromRoot from '~store/app.state';
import {ProductsEffects} from '~store/products/products.effects';

describe('ProductsEffects', () => {
  let effects: ProductsEffects;
  let store: MockStore<fromRoot.IAppState>;

  const initialState: fromRoot.IAppState = fromProductsReducer.productsInitialState;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject<ProductsEffects>(ProductsEffects);
    store = TestBed.inject<MockStore<fromRoot.IAppState>>(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});

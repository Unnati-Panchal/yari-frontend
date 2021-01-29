import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromProductsActions from '~store/products/products.actions';

import {ICategory} from '@yaari/models/product/product.interface';

export const productFeatureKey = 'products';

export interface IProductsState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  categories: ICategory[];
}

export const productsInitialState: IProductsState = {
  loading: false,
  error: null,
  categories: []
};

const productsReducer = createReducer(
  productsInitialState,
  on(fromProductsActions.getCategories, (state) => ({...state, loading: true})),
  on(fromProductsActions.getCategoriesSuccess, (state, action) => ({
    ...state,
    loading: false,
    categories: action.categories
  })),
  on(fromProductsActions.getCategoriesError, (state, action) => ({ ...state, loading: false, error: action.error })),

);

// tslint:disable-next-line:typedef
export function reducer(state: IProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}

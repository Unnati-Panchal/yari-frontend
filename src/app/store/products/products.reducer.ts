import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromProductsActions from '~store/products/products.actions';

import {IBulkUploadBasic, ICategory} from '@yaari/models/product/product.interface';

export const productFeatureKey = 'products';

export interface IProductsState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  categories: ICategory[];
  file: any;
  bulkUploadBasic: IBulkUploadBasic;
  catalogs: IBulkUploadBasic[];
  catalogId: string;
  categoryId: string;
  specTemplate: string[];
  msg: string;
}

export const productsInitialState: IProductsState = {
  loading: false,
  error: null,
  categories: [],
  file: null,
  bulkUploadBasic: null,
  catalogs: null,
  catalogId: null,
  specTemplate: [],
  msg: '',
  categoryId: ''
};

const productsReducer = createReducer(
  productsInitialState,
  on(fromProductsActions.getCategories, (state, action) => ({
    ...state,
    loading: true,
    categoryId: action.categoryId
  })),
  on(fromProductsActions.getCategoriesSuccess, (state, action) => ({
    ...state,
    loading: false,
    categories: action.categories
  })),
  on(fromProductsActions.getCategoriesError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProductsActions.getBulkBasicUploadTemplate, (state) => ({...state, loading: true})),
  on(fromProductsActions.getBulkBasicUploadTemplateSuccess, (state, action) => ({
    ...state,
    loading: false,
    file: action.file
  })),
  on(fromProductsActions.getBulkBasicUploadTemplateError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProductsActions.bulkUploadCatalog, (state, action) => ({
    ...state,
    loading: true,
    fileUpload: action.fileUpload
  })),
  on(fromProductsActions.bulkUploadCatalogSuccess, (state, action) => ({
    ...state,
    loading: false,
    bulkUploadBasic: action.bulkUploadBasic
  })),
  on(fromProductsActions.bulkUploadCatalogError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProductsActions.getCatalogs, (state, action) => ({
    ...state,
    loading: true,
    query: action.query
  })),
  on(fromProductsActions.getCatalogsSuccess, (state, action) => ({
    ...state,
    loading: false,
    catalogs: action.catalogs
  })),
  on(fromProductsActions.getCatalogsError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProductsActions.deleteCatalog, (state, action) => ({
    ...state,
    loading: true,
    catalogId: action.catalogId
  })),
  on(fromProductsActions.deleteCatalogSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(fromProductsActions.deleteCatalogError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProductsActions.getBulkSpecificationsUploadTemplate, (state, action) => ({
    ...state,
    loading: true,
    catalogId: action.catalogId
  })),
  on(fromProductsActions.getBulkSpecificationsUploadTemplateSuccess, (state, action) => ({
    ...state,
    loading: false,
    specTemplate: action.specTemplate
  })),
  on(fromProductsActions.getBulkSpecificationsUploadTemplateError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProductsActions.editSpecifications, (state, action) => ({
    ...state,
    loading: true,
    spec: action.spec
  })),
  on(fromProductsActions.geditSpecificationsSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(fromProductsActions.editSpecificationsError, (state, action) => ({ ...state, loading: false, error: action.error })),


);

// tslint:disable-next-line:typedef
export function reducer(state: IProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}

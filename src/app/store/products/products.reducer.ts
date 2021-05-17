import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromProductsActions from '~store/products/products.actions';

import {IBulkUploadBasic, IBulkUploadStatus, ICatalogProducts, ICategory} from '@yaari/models/product/product.interface';

export const productFeatureKey = 'products';

export interface IProductsState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  categories: ICategory[];
  cities: ICategory[];
  states: ICategory[];
  file: any;
  bulkUploadBasic: IBulkUploadBasic;
  catalogs: IBulkUploadBasic[];
  catalogId: string;
  categoryId: string;
  specTemplate: string[];
  msg: string;
  catalogProducts: ICatalogProducts[];
  bulkUploadStatuses: IBulkUploadStatus[];
  singleBulkUploadStatus: IBulkUploadStatus;
  selectedCatalogue: IBulkUploadBasic;
}

export const productsInitialState: IProductsState = {
  loading: false,
  error: null,
  categories: [],
  cities: [],
  states: [],
  file: null,
  bulkUploadBasic: null,
  catalogs: [],
  catalogId: null,
  specTemplate: [],
  msg: '',
  categoryId: '',
  catalogProducts: [],
  bulkUploadStatuses: undefined,
  singleBulkUploadStatus: null,
  selectedCatalogue: null
};

const productsReducer = createReducer(
  productsInitialState,
  on(fromProductsActions.clearMessages, (state) => ({...state, msg: '', error: null})),

  on(fromProductsActions.getCategories, (state, {categoryId}) => ({...state, loading: true, categoryId})),
  on(fromProductsActions.getCategoriesSuccess, (state, {categories}) => ({...state, loading: false, categories})),
  on(fromProductsActions.getCategoriesError, (state, {error}) => ({ ...state, loading: false, error })),

  on(fromProductsActions.getCities, (state, {stateId}) => ({...state, loading: true, stateId})),
  on(fromProductsActions.getCitiesSuccess, (state, {cities}) => ({...state, loading: false, cities})),
  on(fromProductsActions.getCategoriesError, (state, {error}) => ({ ...state, loading: false, error })),

  on(fromProductsActions.getStates, (state) => ({...state, loading: true})),
  on(fromProductsActions.getStatesSuccess, (state, {states}) => ({...state, loading: false, states})),
  on(fromProductsActions.getStatesError, (state, {error}) => ({ ...state, loading: false, error })),

  on(fromProductsActions.getBulkBasicUploadTemplate, (state) => ({...state, loading: true})),
  on(fromProductsActions.getBulkBasicUploadTemplateSuccess, (state, {file}) => ({...state, loading: false, file})),
  on(fromProductsActions.getBulkBasicUploadTemplateError, (state, {error}) => ({ ...state, loading: false, error })),


  on(fromProductsActions.bulkUploadCatalog, (state, {fileUpload}) => ({...state, loading: true, fileUpload})),
  on(fromProductsActions.bulkUploadCatalogSuccess, (state, {bulkUploadBasic}) => ({...state, loading: false, bulkUploadBasic})),
  on(fromProductsActions.bulkUploadCatalogError, (state, {error}) => ({ ...state, loading: false, error })),


  on(fromProductsActions.getCatalogs, (state, {query}) => ({...state, loading: true, query})),
  on(fromProductsActions.getCatalogsSuccess, (state, {catalogs}) => ({...state, loading: false, catalogs})),
  on(fromProductsActions.getCatalogsError, (state, {error}) => ({ ...state, loading: false, error })),


  on(fromProductsActions.deleteCatalog, (state, {catalogId}) => ({...state, loading: true, catalogId})),
  on(fromProductsActions.deleteCatalogSuccess, (state, {msg}) => ({...state, loading: false, msg})),
  on(fromProductsActions.deleteCatalogError, (state, {error}) => ({ ...state, loading: false, error })),


  on(fromProductsActions.getBulkSpecificationsUploadTemplate, (state, {catalogId}) => ({...state, loading: true, catalogId})),
  on(fromProductsActions.getBulkSpecificationsUploadTemplateSuccess, (state, {specTemplate}) => ({...state, loading: false, specTemplate})),
  on(fromProductsActions.getBulkSpecificationsUploadTemplateError, (state, {error}) => ({ ...state, loading: false, error })),


  on(fromProductsActions.editSpecifications, (state, {spec}) => ({...state, loading: true, spec})),
  on(fromProductsActions.editSpecificationsSuccess, (state, {msg}) => ({...state, loading: false, msg})),
  on(fromProductsActions.editSpecificationsError, (state, {error}) => ({ ...state, loading: false, error })),


  on(fromProductsActions.getCatalogProducts, (state, {catalogId}) => ({...state, loading: true, catalogId})),
  on(fromProductsActions.getCatalogProductsSuccess, (state, {catalogProducts}) => ({...state, loading: false, catalogProducts})),
  on(fromProductsActions.getCatalogProductsError, (state, {error}) => ({ ...state, loading: false, error })),

  on(fromProductsActions.getBulkUploadStatuses, (state) => ({...state, loading: true})),
  on(fromProductsActions.getBulkUploadStatusesSuccess, (state, {bulkUploadStatuses}) => ({...state, loading: false, bulkUploadStatuses})),
  on(fromProductsActions.getBulkUploadStatusesError, (state, {error}) => ({ ...state, loading: false, error })),

  on(fromProductsActions.getBulkUploadStatusById, (state, {taskId}) => ({...state, loading: true, taskId})),
  on(fromProductsActions.getBulkUploadStatusByIdSuccess, (state, {singleBulkUploadStatus}) =>
    ({...state, loading: false, singleBulkUploadStatus})),
  on(fromProductsActions.getBulkUploadStatusByIdError, (state, {error}) => ({ ...state, loading: false, error })),

  on(fromProductsActions.getCatalogById, (state, {id}) => ({...state, loading: true, id})),
  on(fromProductsActions.getCatalogByIdSuccess, (state, {selectedCatalogue}) => ({...state, loading: false, selectedCatalogue})),
  on(fromProductsActions.getCatalogByIdError, (state, {error}) => ({ ...state, loading: false, error })),

);

// tslint:disable-next-line:typedef
export function reducer(state: IProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}

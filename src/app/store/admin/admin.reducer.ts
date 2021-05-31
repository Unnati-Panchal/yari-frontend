import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromRoot from '~store/app.state';

import { Action, createReducer, on } from '@ngrx/store';
import { ICatalogueContentManagement, ICatalogueProducts, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';

import { HttpErrorResponse } from '@angular/common/http';

export const adminFeatureKey = 'admin';

export interface IAdminState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  msg: string;
  uploadedCatalogues: IUploadedCatalogue[];
  catalogueId: number;
  catalogueProducts: ICatalogueProducts[];

  catalogueProductLists: ICatalogueContentManagement[];

  cataloguesContentManagements: ICatalogueContentManagement[];
  // catalogueExcel: Blob;

}

export const adminInitialState: IAdminState = {
  loading: false,
  error: null,
  msg: '',
  uploadedCatalogues: [],
  catalogueId: null,
  catalogueProducts: [],

  catalogueProductLists:[],

  cataloguesContentManagements: undefined
  // catalogueExcel: null
};


export const adminReducer = createReducer(
  adminInitialState,
  on(fromAdminActions.clearMessages, (state) => ({ ...state, msg: '', error: null })),

  on(fromAdminActions.getUploadedCatalogues, (state) => ({ ...state, loading: true })),
  on(fromAdminActions.getUploadedCataloguesSuccess, (state, { uploadedCatalogues }) => ({ ...state, loading: false, uploadedCatalogues })),
  on(fromAdminActions.getUploadedCataloguesError, (state, { error }) => ({ ...state, loading: false, error })),

  // on(fromAdminActions.getCatalogueDownload, (state, { catalogueId }) => ({ ...state, loading: true, catalogueId })),
  // on(fromAdminActions.getCatalogueDownloadSuccess, (state, { catalogueExcel }) => ({ ...state, loading: false, catalogueExcel })),
  // on(fromAdminActions.getCatalogueDownloadError, (state, { error }) => ({ ...state, loading: false, error })),

  on(fromAdminActions.getCatalogueProducts, (state, { catalogueId }) => ({ ...state, loading: true, catalogueId })),
  on(fromAdminActions.getCatalogueProductsSuccess, (state, { catalogueProducts }) => ({ ...state, loading: false, catalogueProducts })),
  on(fromAdminActions.getCatalogueProductsError, (state, { error }) => ({ ...state, loading: false, error })),

  on(fromAdminActions.getCatalogueContentManagements, (state) => ({ ...state, loading: true })),
  on(fromAdminActions.getCatalogueContentManagementsSuccess, (state, action) => ({
    ...state,
    loading: false,
    cataloguesContentManagements: action.cataloguesContentManagements
  })),
  
  on(fromAdminActions.getCatalogueContentManagementsError, (state, action) => ({ ...state, loading: false, error: action.error })),






  on(fromAdminActions.getCatalogueProductList, (state, { catalogueIds }) => ({ ...state, loading: true, catalogueIds })),
  on(fromAdminActions.getCatalogueProductListSuccess, (state, action) => ({
    ...state,
    loading: false,
    catalogueProductLists: action.catalogueProductLists
  })),
  on(fromAdminActions.getCatalogueProductListError, (state, { error }) => ({ ...state, loading: false, error })),




  


);


// tslint:disable-next-line:typedef
export function reducer(state: IAdminState | undefined, action: Action) {
  return adminReducer(state, action);
}

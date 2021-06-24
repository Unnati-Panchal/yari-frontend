import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromRoot from '~store/app.state';

import { Action, createReducer, on } from '@ngrx/store';
import {
  ICatalog,
  ICatalogueContentManagement,
  ICatalogueProducts, IComplaints, IMsgResponse,
  IProductDetail, ISupplierDetails,
  ISupplierList,
  IUploadedCatalogue
} from '@yaari/models/admin/admin.interface';

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
  productDetails: IProductDetail[];
  productDetail: IProductDetail;
  KAMSupplierList: ISupplierList[];
  KAMSupplierDetails: ISupplierDetails;
  KAMCatalogList: ICatalog[];
  KAMProductDetails: IProductDetail[];
  KAMSupplierOnboardings: ISupplierDetails[];
  KAMApprovedResponse: IMsgResponse;
  KAMSupplierComplaints: IComplaints[];
  KAMResellerComplaints: IComplaints[];
}

export const adminInitialState: IAdminState = {
  loading: false,
  error: null,
  msg: '',
  uploadedCatalogues: [],
  catalogueId: null,
  catalogueProducts: [],
  catalogueProductLists: [],
  cataloguesContentManagements: undefined,
  // catalogueExcel: null
  productDetails: [],
  productDetail: null,
  KAMSupplierList: undefined,
  KAMSupplierDetails: undefined,
  KAMCatalogList: undefined,
  KAMProductDetails: undefined,
  KAMSupplierOnboardings: undefined,
  KAMApprovedResponse: undefined,
  KAMSupplierComplaints: undefined,
  KAMResellerComplaints: undefined,
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

  on(fromAdminActions.getProductDetailsSuccess, (state, action) => ({
    ...state,
    loading: false,
    productDetails: action.productDetails,
    productDetail:action.productDetails[0]
  })),

  on(fromAdminActions.getProductDetail, (state, action) => ({
    ...state,
    loading: false,
    productDetail:state.productDetails.find(x => x.id === action.productId)
  })),

  on(fromAdminActions.getProductDetailsError, (state, { error }) => ({ ...state, loading: false, error })),

  on(fromAdminActions.editProductSuccess, (state, action) => ({
    ...state, loading: false, // productDetail: action.product
  })),
  on(fromAdminActions.editProductError, (state, { error }) => ({ ...state, loading: false, error })),

  on(fromAdminActions.getSupplierList, (state, {filter}) => ({...state, loading: true, filter})),
  on(fromAdminActions.getSupplierListSuccess, (state, {KAMSupplierList}) => ({...state, loading: false, KAMSupplierList})),
  on(fromAdminActions.getSupplierListError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.getSupplierDetailsById, (state, {supplierId}) => ({...state, loading: true, supplierId})),
  on(fromAdminActions.getSupplierDetailsByIdSuccess, (state, {KAMSupplierDetails}) => ({...state, loading: false, KAMSupplierDetails})),
  on(fromAdminActions.getSupplierDetailsByIdError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.getCatalogList, (state, {filter}) => ({...state, loading: true, filter})),
  on(fromAdminActions.getCatalogListSuccess, (state, {KAMCatalogList}) => ({...state, loading: false, KAMCatalogList})),
  on(fromAdminActions.getCatalogListError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.getProductsByCatalogId, (state, {catalogId}) => ({...state, loading: true, catalogId})),
  on(fromAdminActions.getProductsByCatalogIdSuccess, (state, {KAMProductDetails}) => ({...state, loading: false, KAMProductDetails})),
  on(fromAdminActions.getProductsByCatalogIdError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.getSupplierOnBoardings, (state, {filter}) => ({...state, loading: true, filter})),
  // tslint:disable-next-line:max-line-length
  on(fromAdminActions.getSupplierOnBoardingsSuccess, (state, {KAMSupplierOnboardings}) => ({...state, loading: false, KAMSupplierOnboardings})),
  on(fromAdminActions.getSupplierOnBoardingsError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.approveRejectSupplier, (state, {supplier}) => ({...state, loading: true, supplier})),
  on(fromAdminActions.approveRejectSupplierSuccess, (state, {KAMApprovedResponse}) => ({...state, loading: false, KAMApprovedResponse})),
  on(fromAdminActions.approveRejectSupplierError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.getSupplierComplaints, (state) => ({...state, loading: true})),
  // tslint:disable-next-line:max-line-length
  on(fromAdminActions.getSupplierComplaintsSuccess, (state, {KAMSupplierComplaints}) => ({...state, loading: false, KAMSupplierComplaints})),
  on(fromAdminActions.getSupplierComplaintsError, (state, {error}) => ({...state, loading: false, error})),

  on(fromAdminActions.getResellerComplaints, (state) => ({...state, loading: true})),
  on(fromAdminActions.getResellerComplaintsSuccess, (state, {KAMResellerComplaints}) => ({...state, loading: false, KAMResellerComplaints})),
  on(fromAdminActions.getResellerComplaintsError, (state, {error}) => ({...state, loading: false, error})),

);


// tslint:disable-next-line:typedef
export function reducer(state: IAdminState | undefined, action: Action) {
  return adminReducer(state, action);
}

import {
  ICatalog,
  ICatalogueContentManagement,
  ICatalogueProducts, IComplaints,
  IEditProduct, IFilter, IMsgResponse,
  IProductDetail, ISupplierDetails,
  ISupplierList, ISupplierOnboard,
  IUploadedCatalogue
} from '@yaari/models/admin/admin.interface';
import { createAction, props } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';

export const clearMessages = createAction('[ADMIN] clear messages');


export const getUploadedCatalogues = createAction('[ADMIN] get uploaded catalogues');

export const getUploadedCataloguesSuccess = createAction('[ADMIN] get uploaded catalogues success',
    props<{ uploadedCatalogues: IUploadedCatalogue[] }>());

export const getUploadedCataloguesError = createAction('[ADMIN] get uploaded catalogues error', props<{ error: HttpErrorResponse }>());


// export const getCatalogueDownload = createAction('[ADMIN] get catalogue download', props<{ catalogueId: number }>());

// export const getCatalogueDownloadSuccess = createAction('[ADMIN] get catalogue download success', props<{ catalogueExcel: Blob }>());

// export const getCatalogueDownloadError = createAction('[ADMIN] get catalogue download error', props<{ error: HttpErrorResponse }>());


export const getCatalogueProducts = createAction('[ADMIN] get catalogue products', props<{ catalogueId: number }>());

export const getCatalogueProductsSuccess = createAction('[ADMIN] get catalogue products success',
    props<{ catalogueProducts: ICatalogueProducts[] }>());

export const getCatalogueProductsError = createAction('[ADMIN] get catalogue products error', props<{ error: HttpErrorResponse }>());


export const getCatalogueContentManagements = createAction('[ADMIN] get catalogue content managements' ,props<{ filter: IFilter }>());


export const getCatalogueContentManagementsSuccess = createAction('[ADMIN] get catalogue content managements success',
    props<{ cataloguesContentManagements: ICatalogueContentManagement[] }>());

// tslint:disable-next-line: max-line-length
export const getCatalogueContentManagementsError = createAction('[ADMIN] get catalogue content managements error', props<{ error: HttpErrorResponse }>());




export const getCatalogueProductList = createAction('[ADMIN] get catalogue product list', props<{ catalogueIds: string }>());

export const getCatalogueProductListSuccess = createAction('[ADMIN] get catalogue product list success', props<{ catalogueProductLists: ICatalogueContentManagement[] }>());


// tslint:disable-next-line: max-line-length
export const getCatalogueProductListError = createAction('[ADMIN] get catalogue product list error', props<{ error: HttpErrorResponse }>());




export const getProductDetails = createAction('[ADMIN] get product details', props<{ productIds: string }>());


export const getProductDetailsSuccess = createAction('[ADMIN] get product details success', props<{ productDetails: IProductDetail[] }>());

// tslint:disable-next-line: max-line-length
export const getProductDetailsError = createAction('[ADMIN] get product details error', props<{ error: HttpErrorResponse }>());

export const getProductDetail = createAction('[ADMIN] get product detail', props<{ productId: number }>());


export const editProduct = createAction('[ADMIN] edit product detail', props<{ product: IEditProduct }>());

export const editProductSuccess = createAction('[ADMIN] edit product detail success', props<{ product: IEditProduct }>());

// tslint:disable-next-line: max-line-length
export const editProductError = createAction('[ADMIN] edit product detail error', props<{ error: HttpErrorResponse }>());



export const getSupplierList = createAction('[ADMIN] getSupplierList', props<{ filter: IFilter }>());
export const getSupplierListSuccess = createAction('[ADMIN] getSupplierList Success', props<{ KAMSupplierList: ISupplierList[] }>());
export const getSupplierListError = createAction('[ADMIN] getSupplierList Error', props<{ error: HttpErrorResponse }>());

export const getSupplierDetailsById = createAction('[ADMIN] getSupplierDetailsById', props<{ supplierId: number }>());
// tslint:disable-next-line:max-line-length
export const getSupplierDetailsByIdSuccess = createAction('[ADMIN] getSupplierDetailsById Success', props<{ KAMSupplierDetails: ISupplierDetails }>());
export const getSupplierDetailsByIdError = createAction('[ADMIN] getSupplierDetailsById Error', props<{ error: HttpErrorResponse }>());


export const getCatalogList = createAction('[ADMIN] getSupplierList', props<{ filter: IFilter }>());
export const getCatalogListSuccess = createAction('[ADMIN] getSupplierList Success', props<{ KAMCatalogList: ICatalog[] }>());
export const getCatalogListError = createAction('[ADMIN] getSupplierList Error', props<{ error: HttpErrorResponse }>());


export const getProductsByCatalogId = createAction('[ADMIN] getProductsByCatalogId', props<{ catalogId: number }>());
// tslint:disable-next-line:max-line-length
export const getProductsByCatalogIdSuccess = createAction('[ADMIN] getProductsByCatalogId Success', props<{ KAMProductDetails: IProductDetail[] }>());
export const getProductsByCatalogIdError = createAction('[ADMIN] getProductsByCatalogId Error', props<{ error: HttpErrorResponse }>());


export const getSupplierOnBoardings = createAction('[ADMIN] getSupplierOnBoardings', props<{ filter: IFilter }>());
// tslint:disable-next-line:max-line-length
export const getSupplierOnBoardingsSuccess = createAction('[ADMIN] getSupplierOnBoardings Success', props<{ KAMSupplierOnboardings: ISupplierDetails[] }>());
export const getSupplierOnBoardingsError = createAction('[ADMIN] getSupplierOnBoardings Error', props<{ error: HttpErrorResponse }>());


export const approveRejectSupplier = createAction('[ADMIN] approveRejectSupplier', props<{ supplier: ISupplierOnboard }>());
// tslint:disable-next-line:max-line-length
export const approveRejectSupplierSuccess = createAction('[ADMIN] approveRejectSupplier Success', props<{ KAMApprovedResponse: IMsgResponse }>());
export const approveRejectSupplierError = createAction('[ADMIN] approveRejectSupplier Error', props<{ error: HttpErrorResponse }>());


export const getSupplierComplaints = createAction('[ADMIN] getSupplierComplaints');
// tslint:disable-next-line:max-line-length
export const getSupplierComplaintsSuccess = createAction('[ADMIN] getSupplierComplaints Success', props<{ KAMSupplierComplaints: IComplaints[] }>());
export const getSupplierComplaintsError = createAction('[ADMIN] getSupplierComplaints Error', props<{ error: HttpErrorResponse }>());


export const getResellerComplaints = createAction('[ADMIN] getResellerComplaints');
// tslint:disable-next-line:max-line-length
export const getResellerComplaintsSuccess = createAction('[ADMIN] getResellerComplaints Success', props<{ KAMResellerComplaints: IComplaints[] }>());
export const getResellerComplaintsError = createAction('[ADMIN] getResellerComplaints Error', props<{ error: HttpErrorResponse }>());

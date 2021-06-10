import { ICatalogueContentManagement, ICatalogueProducts, IEditProduct, IProductDetail, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
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


export const getCatalogueContentManagements = createAction('[ADMIN] get catalogue content managements');


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




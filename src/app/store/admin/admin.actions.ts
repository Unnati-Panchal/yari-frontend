import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ICatalogueProducts, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';

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


import { ICatalogueContentManagement, ICatalogueProducts, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
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

export const getCatalogueContentManagements = createAction('[ADMIN] get catalogue content managements' , props<{ catalogueIds : string}>());

export const getCatalogueContentManagementsSuccess = createAction('[ADMIN] get catalogue content managements success',
    props<{ cataloguesContentManagements: ICatalogueContentManagement[] }>());

// tslint:disable-next-line: max-line-length
export const getCatalogueContentManagementsError = createAction('[ADMIN] get catalogue content managements error', props<{ error: HttpErrorResponse }>());


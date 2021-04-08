import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import {
  IBulkUploadBasic,
  IBulkUploadStatus,
  ICatalogProducts,
  ICategory,
  IFileUpload,
  IQuery,
  ISpecifications
} from '@yaari/models/product/product.interface';

export const clearMessages = createAction('[PRODUCTS] clear messages');

export const getCategories = createAction('[PRODUCTS] get categories', props<{ categoryId: string }>());

export const getCategoriesSuccess = createAction('[PRODUCTS] get categories success', props<{ categories: ICategory[] }>());

export const getCategoriesError = createAction('[PRODUCTS] get categories error', props<{ error: HttpErrorResponse }>());


export const getBulkBasicUploadTemplate = createAction('[PRODUCTS] getBulkBasicUploadTemplate');

export const getBulkBasicUploadTemplateSuccess = createAction('[PRODUCTS] getBulkBasicUploadTemplate success', props<{ file: any }>());

export const getBulkBasicUploadTemplateError =
  createAction('[PRODUCTS] getBulkBasicUploadTemplate error', props<{ error: HttpErrorResponse }>());


export const bulkUploadCatalog = createAction('[PRODUCTS] bulkUploadCatalog', props<{ fileUpload: IFileUpload }>());

export const bulkUploadCatalogSuccess =
  createAction('[PRODUCTS] bulkUploadCatalog success', props<{ bulkUploadBasic: IBulkUploadBasic }>());

export const bulkUploadCatalogError = createAction('[PRODUCTS] bulkUploadCatalog error', props<{ error: HttpErrorResponse }>());


export const getCatalogs = createAction('[PRODUCTS] getCatalogs', props<{ query: IQuery }>());

export const getCatalogsSuccess = createAction('[PRODUCTS] getCatalogs success', props<{ catalogs: IBulkUploadBasic[] }>());

export const getCatalogsError = createAction('[PRODUCTS] getCatalogs error', props<{ error: HttpErrorResponse }>());


export const deleteCatalog = createAction('[PRODUCTS] deleteCatalog', props<{ catalogId: string }>());

export const deleteCatalogSuccess = createAction('[PRODUCTS] deleteCatalog success', props<{ msg: string }>());

export const deleteCatalogError = createAction('[PRODUCTS] deleteCatalog error', props<{ error: HttpErrorResponse }>());


export const getBulkSpecificationsUploadTemplate = createAction('[PRODUCTS] getBulkSpecificationsUploadTemplate',
  props<{ catalogId: string }>());

export const getBulkSpecificationsUploadTemplateSuccess = createAction('[PRODUCTS] getBulkSpecificationsUploadTemplate success',
  props<{ specTemplate: string[] }>());

export const getBulkSpecificationsUploadTemplateError = createAction('[PRODUCTS] getBulkSpecificationsUploadTemplate error',
  props<{ error: HttpErrorResponse }>());


export const editSpecifications = createAction('[PRODUCTS] editSpecifications',
  props<{ spec: ISpecifications }>());

export const editSpecificationsSuccess = createAction('[PRODUCTS] editSpecifications success', props<{ msg: string }>());

export const editSpecificationsError = createAction('[PRODUCTS] editSpecifications error',
  props<{ error: HttpErrorResponse }>());


export const getCatalogProducts = createAction('[PRODUCTS] CatalogProducts',
  props<{ catalogId: string }>());

export const getCatalogProductsSuccess = createAction('[PRODUCTS] CatalogProducts success',
  props<{ catalogProducts: ICatalogProducts[] }>());

export const getCatalogProductsError = createAction('[PRODUCTS] CatalogProducts error',
  props<{ error: HttpErrorResponse }>());


export const getBulkUploadStatuses = createAction('[PRODUCTS] getBulkUploadStatuses');

export const getBulkUploadStatusesSuccess = createAction('[PRODUCTS] getBulkUploadStatuses success',
  props<{ bulkUploadStatuses: IBulkUploadStatus[] }>());

export const getBulkUploadStatusesError = createAction('[PRODUCTS] getBulkUploadStatuses error', props<{ error: HttpErrorResponse }>());


export const getBulkUploadStatusById = createAction('[PRODUCTS] getBulkUploadStatusById', props<{ taskId: string }>());

export const getBulkUploadStatusByIdSuccess = createAction('[PRODUCTS] getBulkUploadStatusById success',
  props<{ singleBulkUploadStatus: IBulkUploadStatus }>());

export const getBulkUploadStatusByIdError = createAction('[PRODUCTS] getBulkUploadStatusById error', props<{ error: HttpErrorResponse }>());


export const getCatalogById = createAction('[PRODUCTS] getCatalogById', props<{ id: number }>());

export const getCatalogByIdSuccess = createAction('[PRODUCTS] getCatalogById success', props<{ selectedCatalogue: IBulkUploadBasic }>());

export const getCatalogByIdError = createAction('[PRODUCTS] getCatalogById error', props<{ error: HttpErrorResponse }>());

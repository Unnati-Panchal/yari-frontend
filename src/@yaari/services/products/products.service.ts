import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';
import {
  IBulkUploadBasic,
  IBulkUploadStatus,
  ICatalogProducts,
  ICategory,
  IFileUpload,
  IQuery,
  ISpecifications
} from '@yaari/models/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) {
  }

  public getCategories(categoryId: string): Observable<ICategory[]> {
    let suffix = '';
    if (categoryId) {
      suffix = `?parent_category_id=${categoryId}`;
    }
    return this._http.get<ICategory[]>(`${environment.API_BASE_URL}/api/v1/categories${suffix}`);
  }

  public getBulkBasicUploadTemplate(categoryId: number): Observable<any> {
    const url = `${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-basic-template?category_id=${categoryId}`;
    // @ts-ignore
    return this._http.get<any>(url, { responseType: 'blob' });
  }

  public bulkUploadCatalog(body: IFileUpload): Observable<IBulkUploadBasic> {
    const formData = new FormData();
    formData.append('file', body.file, body.file.name);
    if (body?.images_zipfile) {
      formData.append('images_zipfile', body.images_zipfile, body.images_zipfile.name);
    }
    return this._http.post<IBulkUploadBasic>
    (
      `${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-basic?catalog_name=${body.catalogue_name}&category_id=${body.category_id}`,
      formData
    );
  }


  public getCatalogs(query: IQuery): Observable<IBulkUploadBasic[]> {
    return this._http.get<IBulkUploadBasic[]>
    (`${environment.API_BASE_URL}/api/v1/catalogs?start_date=${query?.startDate}&end_date=${query?.endDate}`);
  }

  public deleteCatalog(catalogId: string): Observable<any> {
    return this._http.delete<any>(`${environment.API_BASE_URL}/api/v1/catalog?catalog_id=${catalogId}`);
  }

  public getBulkSpecificationsUploadTemplate(catalogId: string): Observable<string[]> {
    return this._http.get<string[]>
    (`${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-specifications-properties?catalog_id=${catalogId}`);
  }

  public editSpecifications(spec: ISpecifications): Observable<{msg: string}> {
    const body = spec.details;
    return this._http.put<{msg: string}>
    (`${environment.API_BASE_URL}/api/v1/catalog/product/specifications?catalog_id=${spec.catalog_id}`, body);
  }

  public catalogProducts(catalogId: string): Observable<ICatalogProducts[]> {
    return this._http.get<ICatalogProducts[]>
    (`${environment.API_BASE_URL}/api/v1/catalog/products?catalog_id=${catalogId}`);
  }

  public getBulkUploadStatuses(): Observable<IBulkUploadStatus[]> {
    return this._http.get<IBulkUploadStatus[]>(`${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-basic-statuses`);
  }

  public getBulkUploadStatusById(taskId: string): Observable<IBulkUploadStatus> {
    return this._http.get<IBulkUploadStatus>
    (`${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-basic-status?task_id=${taskId}`);
  }
}

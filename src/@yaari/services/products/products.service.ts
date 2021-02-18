import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';
import {IBulkUploadBasic, ICategory, IFileUpload, IQuery, ISpecifications} from '@yaari/models/product/product.interface';

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

  public getBulkBasicUploadTemplate(): Observable<any> {
    // @ts-ignore
    return this._http.get<any>(`${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-basic-template`, { responseType: 'blob' });
  }

  public bulkUploadCatalog(body: IFileUpload): Observable<IBulkUploadBasic> {
    const formData = new FormData();
    formData.append('file', body.file, body.file.name);
    return this._http.post<IBulkUploadBasic>
    (`${environment.API_BASE_URL}/api/v1/catalog/bulk-upload-basic?sub_category_id=${body.category_id}`, formData);
  }

  public getCatalogs(query: IQuery): Observable<IBulkUploadBasic[]> {
    return this._http.get<IBulkUploadBasic[]>
    (`${environment.API_BASE_URL}/api/v1/catalogs?start_date=${query.startDate}&end_date=${query.endDate}`);
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
}

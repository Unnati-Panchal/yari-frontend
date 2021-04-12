import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICatalogueApprove, ICatalogueProducts, IUploadedCatalogue, IResMsg } from '@yaari/models/admin/admin.interface';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  public getUploadedCatalogues(): Observable<IUploadedCatalogue[]> {
    const suffix = `?limit=20`;
    return this._http.get<IUploadedCatalogue[]>(`${environment.API_BASE_URL}/api/v1/admin/unapproved-catalogue${suffix}`);
  }

  public getCatalogueProducts(catalogueId: number): Observable<ICatalogueProducts[]> {
    const suffix = `?catalog_id=${catalogueId}`;
    return this._http.get<ICatalogueProducts[]>(`${environment.API_BASE_URL}/api/v1/admin/products${suffix}`);
  }

  public getCatalogueDownload(catalogueId: number): Observable<any> {
    const suffix = `?catalog_id=${catalogueId}`;
    // @ts-ignore
    return this._http.get<any>(`${environment.API_BASE_URL}/api/v1/admin/download-catalogue${suffix}`, { responseType: 'blob' });
  }

  public approveRejectCatalogue(catalogueApprove: ICatalogueApprove): Observable<IResMsg> {
    const body = catalogueApprove;
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/approve`, body);
  }

}


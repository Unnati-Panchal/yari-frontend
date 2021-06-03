import {
  IAdminUserDetails,
  ICatalogueApprove,
  ICatalogueContentManagement,
  ICatalogueProducts,
  IEditProduct,
  IPricingCatalogue,
  IPricingEdit,
  IPricingProduct,
  IProductDetail,
  IResMsg,
  IUploadedCatalogue
} from '@yaari/models/admin/admin.interface';

import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { IResetPassword } from '@yaari/models/auth/auth.interface';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '~env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient,
    private _snackbar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router
  ) { }

  public forgotPasswordAdmin(email: string): Observable<{ msg: string }> {
    const url = window.location.href.split('forgot-password').join('reset-password');
    return this._http.post<{ msg: string }>(`${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}?user_role=admin&redirect_url=${url}`, email);
  }

  public resetPasswordAdmin(resetPassword: IResetPassword): Observable<{ msg: string }> {
    return this._http.post<{ msg: string }>(`${environment.API_BASE_URL}/api/v1/user/reset-password?user_role=admin`, resetPassword);
  }

  public getUploadedCatalogues(): Observable<IUploadedCatalogue[]> {
    return this._http.get<IUploadedCatalogue[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/list-catalogues?fetch_type=approve_uploaded_catalogue`);
  }

  public getCatalogueProducts(catalogueId: number): Observable<ICatalogueProducts[]> {
    const suffix = `?catalog_id=${catalogueId}`;
    return this._http.get<ICatalogueProducts[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/products${suffix}`);
  }

  public getCatalogueDownload(catalogueId: number): Observable<any> {
    const suffix = `?catalog_id=${catalogueId}`;
    // @ts-ignore
    return this._http.get<any>(`${environment.API_BASE_URL}/api/v1/admin/download-catalogue${suffix}`, { responseType: 'blob' });
  }


  public getProductDetail(productIds: string): Observable<IProductDetail[]> {
    const body = productIds;
    return this._http.post<IProductDetail[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/content-mgmt/editable-products`, '[' + body+ ']');

  }

  public editProduct(editProduct: IEditProduct): Observable<IEditProduct> {
    const body = editProduct;
    return this._http.put<IEditProduct>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/content-mgmt/edit`, body);
  }

  public approveRejectCatalogue(catalogueApprove: ICatalogueApprove): Observable<IResMsg> {
    const body = catalogueApprove;
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/approve-reject`, body);
  }

  public getAllRolesDesignations(): Observable<any> {
    return this._http.get<any>(`${environment.API_BASE_URL}/api/v1/admin/all-roles-designations`);
  }

  public createAdminUser(adminUserDetails: IAdminUserDetails): Observable<IResMsg> {
    const body = adminUserDetails;
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/register/admin-user`, body);
  }
  public authorizedAdmin(role: string): void {
    this._auth.adminDetails().subscribe(adminDetails => {
      if (adminDetails.admin_role !== role) {
        this._snackbar.open('Unauthorized Access', '', { duration: 3000 });
        this._router.navigate([`/admin/${adminDetails.admin_role.split('_').join('-')}`]);
      }
    });
  }

  public getCatalogContents(): Observable<ICatalogueContentManagement[]> {
    return this._http.get<ICatalogueContentManagement[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/list-catalogues?fetch_type=catalogue_content_management`);
  }

  public getCatalogProductList(catalogueIds: string): Observable<ICatalogueContentManagement[]> {
    return this._http.get<ICatalogueContentManagement[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/content-mgmt/products?catalog_ids=${catalogueIds}%2C346&limit=100&skip=0`);
  }
  public getofferTypes(): Observable<any> {
    return this._http.get<IPricingCatalogue[]>(`${environment.API_BASE_URL}/api/v1/admin/pricing/offers`);
  }

  public getPricingCatalogues(skip: number, pageSize: number, filterBy: string): Observable<IPricingCatalogue[]> {
    const suffix = `?filter_by=${filterBy}&limit=${pageSize}&skip=${skip}`;
    return this._http.get<IPricingCatalogue[]>(`${environment.API_BASE_URL}/api/v1/admin/pricing/list-catalogue${suffix}`);
  }

  public getPricingProducts(catalogueId: number): Observable<IPricingProduct[]> {
    const suffix = `?catalog_id=${catalogueId}`;
    return this._http.get<IPricingProduct[]>(`${environment.API_BASE_URL}/api/v1/admin/pricing/products${suffix}`);
  }

  public getPricingCatalogueDownload(catalogueId: number): Observable<any> {
    const suffix = `?catalog_id=${catalogueId}`;
    // @ts-ignore
    return this._http.get<any>(`${environment.API_BASE_URL}/api/v1/admin/pricing/download-products${suffix}`, { responseType: 'blob' });
  }

  public editPricing(editPricingDetails: IPricingEdit[]): Observable<IResMsg> {
    const body = editPricingDetails;
    return this._http.put<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/pricing/edit`, body);
  }

  public uploadPricing(file: any): Observable<IResMsg> {
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/pricing/upload`, file);
  }

  public getViewCatalogues(): Observable<IUploadedCatalogue[]> {
    return this._http.get<IUploadedCatalogue[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/list-catalogues?fetch_type=view_catalogue`);
  }
}

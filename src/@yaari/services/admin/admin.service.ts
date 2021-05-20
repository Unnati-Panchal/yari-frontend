import { IAdminUserDetails, ICatalogueApprove, ICatalogueProducts, IResMsg, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';

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

  public approveRejectCatalogue(catalogueApprove: ICatalogueApprove): Observable<IResMsg> {
    const body = catalogueApprove;
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/approve`, body);
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
}


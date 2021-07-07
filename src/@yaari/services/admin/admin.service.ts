import {
  IAdminUserDetails,
  ICatalog,
  ICatalogueApprove,
  ICatalogueContentManagement, ICatalogueManagementCountFilter,
  ICatalogueProducts,
  IComplaints,
  IEditProduct,
  IFilter,
  IMsgResponse,
  IPricingCatalogue,
  IPricingEdit,
  IPricingProduct,
  IProductDetail,
  IResMsg,
  ISupplierDetails,
  ISupplierList,
  ISupplierOnboard,
  IUploadedCatalogue
} from '@yaari/models/admin/admin.interface';


import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {IResetPassword} from '@yaari/models/auth/auth.interface';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '~env/environment';
import {getQuery} from '@yaari/utils/utlis';

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
    return this._http.post<{ msg: string }>(
      `${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}?user_role=admin&redirect_url=${url}`, email
    );
  }

  public resetPasswordAdmin(resetPassword: IResetPassword): Observable<{ msg: string }> {
    return this._http.post<{ msg: string }>(`${environment.API_BASE_URL}/api/v1/user/reset-password?user_role=admin`, resetPassword);
  }

  public getUploadedCatalogues(): Observable<IUploadedCatalogue[]> {
    return this._http.get<IUploadedCatalogue[]>(
      `${environment.API_BASE_URL}/api/v1/admin/catalogue/list-catalogues?fetch_type=approve_uploaded_catalogue&limit=10000`
    );
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
    return this._http.post<IProductDetail[]>(
      `${environment.API_BASE_URL}/api/v1/admin/catalogue/content-mgmt/editable-products`, '[' + productIds + ']'
    );

  }

  public editProduct(editProduct: IEditProduct): Observable<IEditProduct> {
    return this._http.post<IEditProduct>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/content-mgmt/edit`, editProduct);
  }

  public approveRejectCatalogue(catalogueApprove: ICatalogueApprove): Observable<IResMsg> {
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/approve-reject`, catalogueApprove);
  }

  public getAllRolesDesignations(): Observable<any> {
    return this._http.get<any>(`${environment.API_BASE_URL}/api/v1/admin/all-roles-designations`);
  }

  public createAdminUser(adminUserDetails: IAdminUserDetails): Observable<IResMsg> {
    const body = adminUserDetails;
    const url = window.location.href.replace('super-user/create-user', 'login');
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/register/admin-user?redirect_url=${url}`, body);
  }

  public authorizedAdmin(role: string): void {
    this._auth.adminDetails().subscribe(adminDetails => {
      if (adminDetails.admin_role !== role) {
        this._snackbar.open('Unauthorized Access', '', {duration: 3000});
        this._router.navigate([`/admin/${adminDetails.admin_role.split('_').join('-')}`]);
      }
    });
  }

  public getCatalogContents(filter: IFilter): Observable<ICatalogueContentManagement[]> {
    const query = getQuery(filter);//catalogue_content_management
    return this._http.get<ICatalogueContentManagement[]>(
      `${environment.API_BASE_URL}/api/v1/admin/catalogue/list-catalogues${query}&limit=10000`
    );
  }

  public getCatalogProductList(catalogueIds: string): Observable<ICatalogueContentManagement[]> {
    return this._http.get<ICatalogueContentManagement[]>(
      `${environment.API_BASE_URL}/api/v1/admin/catalogue/content-mgmt/products?catalog_ids=${catalogueIds}&limit=1000&skip=0`
    );
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
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/pricing/edit`, editPricingDetails);
  }

  public uploadPricing(file: any): Observable<IResMsg> {
    return this._http.post<IResMsg>(`${environment.API_BASE_URL}/api/v1/admin/pricing/upload`, file);
  }

  public getViewCatalogues(filter:  IFilter): Observable<IUploadedCatalogue[]> {
    const query = getQuery(filter);//view_catalogue
    return this._http.get<IUploadedCatalogue[]>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/list-catalogues${query}`);
  }

  public getSupplierList(filter: IFilter): Observable<ISupplierList[]> {
    const query = getQuery(filter);
    return this._http.get<ISupplierList[]>(`${environment.API_BASE_URL}/api/v1/admin/kam/suppliers${query}`);
  }

  public getSupplierDetailsById(supplierId: number): Observable<ISupplierDetails> {
    return this._http.get<ISupplierDetails>(`${environment.API_BASE_URL}/api/v1/admin/kam/supplier-details?supplier_id=${supplierId}`);
  }

  public getCatalogList(filter: IFilter): Observable<ICatalog[]> {
    const query = getQuery(filter);
    return this._http.get<ICatalog[]>(`${environment.API_BASE_URL}/api/v1/admin/kam/catalogues${query}`);
  }

  public getProductsByCatalogId(catalogId: number): Observable<IProductDetail[]> {
    return this._http.get<IProductDetail[]>(`${environment.API_BASE_URL}/api/v1/admin/kam/products?catalog_id=${catalogId}`);
  }

  public getSupplierOnBoardings(filter: IFilter): Observable<ISupplierDetails[]> {
    const query = getQuery(filter);
    return this._http.get<ISupplierDetails[]>(`${environment.API_BASE_URL}/api/v1/admin/kam/onboarding/supppliers${query}`);
  }

  public approveRejectSupplier(supplier: ISupplierOnboard): Observable<IMsgResponse> {
    return this._http.post<IMsgResponse>(`${environment.API_BASE_URL}/api/v1/admin/kam/onboarding/approve-reject`, supplier);
  }

  public getSupplierComplaints(): Observable<IComplaints[]> {
    return this._http.get<IComplaints[]>(`${environment.API_BASE_URL}/api/v1/admin/kam/supplier/complaints`);
  }

  public getResellerComplaints(): Observable<IComplaints[]> {
    return this._http.get<IComplaints[]>(`${environment.API_BASE_URL}/api/v1/admin/kam/reseller/complaints`);
  }

  public downloadSupplier(): Observable<ArrayBuffer> {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this._http.get<ArrayBuffer>(`${environment.API_BASE_URL}/api/v1/admin/kam/onboarding/download-suppliers`, { responseType: 'blob' });
  }

  public getCatalogueManagementCount(filter:ICatalogueManagementCountFilter): Observable<number> {
    const query = getQuery(filter);
    return this._http.get<number>(`${environment.API_BASE_URL}/api/v1/admin/catalogue/catalogue-count${query}`);
  }
}

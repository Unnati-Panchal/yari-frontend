import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';
import {
  IEditSupplierProfile,
  ILogin,
  IOnboarders,
  IRegistration,
  IToken,
  IVerifyGstPan,
  IVerifyOtp,
  KYCDetailsResponse
} from '@yaari/models/auth/auth.interface';
import {Router} from '@angular/router';
import * as fromAuthActions from '~store/auth/auth.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessKeyStorageKey = 'yaari.accessKey';

  constructor(private _http: HttpClient, private _router: Router, private _store: Store<IAppState>) {
  }

  public get accessToken(): string {
    return JSON.parse(sessionStorage.getItem(this._accessKeyStorageKey));
  }

  public set accessToken(accessToken: string) {
    sessionStorage.setItem(this._accessKeyStorageKey, JSON.stringify(accessToken));
  }

  public logout(): void {
    sessionStorage.clear();
    this._store.dispatch(fromAuthActions.clearState());
    this.redirectToLogin();
  }

  public redirectToLogin(): void {
    this._router.navigate(['auth/login']);
  }

  public passwordRecovery(email: string): Observable<string> {
    return this._http.post<string>(`${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}`, email);
  }

  public login(login: ILogin): Observable<IToken> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    const body = new URLSearchParams();
    body.set('username', login.username);
    body.set('password', login.password);
    body.set('user_role', login.user_role);
    return this._http.post<IToken>
    (`${environment.API_BASE_URL}/api/v1/user/login/access-token?user_role=supplier`, body.toString(), httpOptions);
  }

  public submitKYCForVerification(body: IRegistration): Observable<IRegistration> {
    return this._http.post<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier/kyc`, body);
  }

  public panVerification(body: IVerifyGstPan): Observable<KYCDetailsResponse> {
    return this._http.post<KYCDetailsResponse>(`${environment.API_BASE_URL}/api/v1/supplier/kyc/pan-verification`, body);
  }

  public gstVerification(body: IVerifyGstPan): Observable<KYCDetailsResponse> {
    return this._http.post<KYCDetailsResponse>(`${environment.API_BASE_URL}/api/v1/supplier/kyc/gst-verification`, body);
  }

  public bankVerification(): Observable<KYCDetailsResponse> {
    return this._http.get<KYCDetailsResponse>(`${environment.API_BASE_URL}/api/v1/supplierbank-verification`);
  }

  public generateOtp(email: string): Observable<KYCDetailsResponse> {
    return this._http.get<KYCDetailsResponse>(`${environment.API_BASE_URL}/api/v1/supplier/kyc/generate-email-otp?email=${email}`);
  }

  public verifyOtp(body: IVerifyOtp): Observable<KYCDetailsResponse> {
    return this._http.post<KYCDetailsResponse>(`${environment.API_BASE_URL}/api/v1/supplier/kyc/verify-email-otp?otp=${body.otp}&email=${body.email}`, body);
  }

  public approveKYC(body: IRegistration): Observable<IRegistration> {
    return this._http.post<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier/kyc-approve`, body);
  }

  public registerSupplier(body: IRegistration): Observable<IRegistration> {
    return this._http.post<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier/register`, body);
  }

  public getOnboarders(): Observable<IOnboarders[]> {
    return this._http.get<IOnboarders[]>(`${environment.API_BASE_URL}/api/v1/supplier/onboarders`);
  }

  public editSupplier(supplierProfileChanges: IEditSupplierProfile): Observable<IRegistration> {
    return this._http.put<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier`, supplierProfileChanges);
  }

  public supplierDetails(): Observable<IRegistration> {
    return this._http.get<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier`);
  }
}

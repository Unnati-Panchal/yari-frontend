import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';
import {ILogin, IRegistration} from '@yaari/models/auth/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {
  }

  public registerSupplier(body: IRegistration): Observable<IRegistration> {
    return this._http.post<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier/register`, body);
  }

  public passwordRecovery(email: string): Observable<string> {
    return this._http.post<string>(`${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}`, email);
  }

  public login(body: ILogin): Observable<ILogin> {
    return this._http.post<ILogin>(`${environment.API_BASE_URL}/api/v1/user/login/access-token`, body);
  }
}

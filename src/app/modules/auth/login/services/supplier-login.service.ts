import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '~env/environment';

import {ILogin} from '~auth/login/interfaces/supplier-login.interface';

@Injectable({
  providedIn: 'root'
})
export class SupplierLoginService {
  constructor(private _http: HttpClient) {
  }

  public supplierLogin(body: ILogin): Observable<ILogin> {
    return this._http.post<ILogin>(`${environment.API_BASE_URL}/api/v1/user/login/access-token`, body);
  }
}

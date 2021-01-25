import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '~env/environment';

import {ApiService} from '@yaari/services/api/api.service';

import {ILogin} from '~auth/login/interfaces/supplier-login.interface';

@Injectable({
  providedIn: 'root'
})
export class SupplierLoginService {
  constructor(private _apiService: ApiService) {
  }

  public supplierLogin(body: ILogin): Observable<ILogin> {
    return this._apiService.post(`${environment.API_BASE_URL}/api/v1/user/login/access-token`, body);
  }
}

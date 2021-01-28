import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {ICategory, ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';

import {environment} from '~env/environment';
import {ApiService} from '@yaari/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {
  constructor(private _apiService: ApiService) {
  }

  public registerSupplier(body: ISupplierRegistration): Observable<ISupplierRegistration> {
    return this._apiService.post(`${environment.API_BASE_URL}/api/v1/supplier/register`, body);
  }

  public getCategories(): Observable<ICategory[]> {
    return this._apiService.get(`${environment.API_BASE_URL}/api/v1/product/categories`);
  }
}

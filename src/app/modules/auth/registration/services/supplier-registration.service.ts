import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {ICategory, ISupplierRegistration} from '~auth/registration/interfaces/supplier-registration.interface';

import {environment} from '~env/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {
  constructor(private _http: HttpClient) {
  }

  public registerSupplier(body: ISupplierRegistration): Observable<ISupplierRegistration> {
    return this._http.post<ISupplierRegistration>(`${environment.API_BASE_URL}/api/v1/supplier/register`, body);
  }

  public getCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`${environment.API_BASE_URL}/api/v1/product/categories`);
  }
}

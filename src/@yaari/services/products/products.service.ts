import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';
import {ICategory} from '@yaari/models/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) {
  }

  public getCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`${environment.API_BASE_URL}/api/v1/categories`);
  }
}

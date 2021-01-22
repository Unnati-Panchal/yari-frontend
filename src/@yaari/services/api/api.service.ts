import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {IRequestOptions, IResponse} from '@yaari/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  public request<T>(method: string, path: string, body: any | null, options: IRequestOptions): Observable<T> {
    if (['get', 'delete', 'post', 'put', 'patch'].indexOf(method) === -1) {
      return throwError('Invalid HTTP method');
    }

    let request$: Observable<IResponse<T>>;

    if (method === 'get' || method === 'delete') {
      request$ = this._http[method]<IResponse<T>>(path, options);
    } else if (method === 'post' || method === 'put' || method === 'patch') {
      request$ = this._http[method]<IResponse<T>>(path, body, options);
    }

    return request$.pipe(
      map((response: IResponse<T>) => response.data),
      catchError(err => throwError(err || `Error while making a request`))
    );
  }
  public get<T>(path: string, options: IRequestOptions = {}): Observable<T> {
    return this.request('get', path, null, options);
  }
  public delete<T>(path: string, options: IRequestOptions = {}): Observable<T> {
    return this.request('delete', path, null, options);
  }
  public post<T>(path: string, body: any, options: IRequestOptions = {}): Observable<T> {
    return this.request('post', path, body, options);
  }
  public put<T>(path: string, body: any, options: IRequestOptions = {}): Observable<T> {
    return this.request('put', path, body, options);
  }
  public patch<T>(path: string, body: any, options: IRequestOptions = {}): Observable<T> {
    return this.request('patch', path, body, options);
  }
}

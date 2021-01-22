import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Describes the shape of a response from the API
 */
export interface IResponse<T = any> {
  statusCode?: string;
  statusText?: string;
  data: T;
}

/**
 * Interface describing options parameter used by HttpClient#request
 */
export interface IRequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

export interface IVerifyCompanyResponsePayload {
  status: string;
  reason: string;
}

export interface IResponseError {
  type: string;
  message: string;
}

export type ResponseErrors = IResponseError[];

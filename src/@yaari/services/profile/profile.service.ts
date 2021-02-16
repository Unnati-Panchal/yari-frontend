import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '~env/environment';
import {IAddRemoveImage, IBucket, IBucketItems, ICreateBucket, IInsertBucket} from '@yaari/models/profile/profile.interface';
import {IPayment, IQuery, IRatingAndReviews} from '@yaari/models/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _http: HttpClient) {
  }

  public getBuckets(): Observable<IBucket[]> {
    return this._http.get<IBucket[]>(`${environment.API_BASE_URL}/api/v1/dashboard/buckets`);
  }

  public getBucketItems(bucketId: number): Observable<IBucketItems[]> {
    return this._http.get<IBucketItems[]>(`${environment.API_BASE_URL}/api/v1/dashboard/bucket-items?bucket_id=${bucketId}`);
  }

  public deleteBucketItem(bucketId: number): Observable<{msg: string}> {
    return this._http.delete<{msg: string}>(`${environment.API_BASE_URL}/api/v1/dashboard/bucket-item?bucket_item_id=${bucketId}`);
  }

  public insertBucketItem(requestInsertBody: IInsertBucket): Observable<{msg: string}> {
    return this._http.post<{msg: string}>
    (`${environment.API_BASE_URL}/api/v1/dashboard/bucket-item?bucket_id=${requestInsertBody.bucketId}`, requestInsertBody);
  }

  public createBucket(requestBody: ICreateBucket): Observable<{id: string}> {
    return this._http.post<{id: string}>(`${environment.API_BASE_URL}/api/v1/dashboard/bucket-item`, requestBody);
  }

  public updateBucket(requestCreateBody: ICreateBucket): Observable<{msg: string}> {
    return this._http.put<{msg: string}>
    (`${environment.API_BASE_URL}/api/v1/dashboard/bucket?bucket_id=${requestCreateBody.bucketId}`, requestCreateBody);
  }

  public addImageToBucket(addImage: IAddRemoveImage): Observable<{msg: string}> {
    return this._http.put<{msg: string}>
    (`${environment.API_BASE_URL}/api/v1/dashboard/add-image?url=${addImage.url}&bucket_id=${addImage.bucketId}`, {});
  }

  public removeImage(removeImage: IAddRemoveImage): Observable<{msg: string}> {
    return this._http.delete<{msg: string}>(`${environment.API_BASE_URL}/api/v1/dashboard/remove-image?url=${removeImage.url}&bucket_id=${removeImage.bucketId}`);
  }

  public uploadImage(file: string): Observable<{url: string}> {
    return this._http.post<{url: string}>(`${environment.API_BASE_URL}/api/v1/dashboard/upload-image`, file);
  }

  public getImages(bucketId: number): Observable<{url: string, bucket_id: number}> {
    return this._http.get<{url: string, bucket_id: number}>(`${environment.API_BASE_URL}/api/v1/dashboard/images?bucket_id=${bucketId}`);
  }

  public getSupplierSettlement(query: IQuery): Observable<IPayment[]> {
    return this._http.get<IPayment[]>
    (`${environment.API_BASE_URL}/api/v1/supplier/settlement/payment-supplier?start_time_milli=${query.startDate}&end_time_milli=${query.endDate}`);
  }

  public getRatingAndReviews(): Observable<IRatingAndReviews[]> {
    return this._http.post<IRatingAndReviews[]>
    (`${environment.API_BASE_URL}/api/v1/product/ratings-reviews-supplier`, {});
  }
}

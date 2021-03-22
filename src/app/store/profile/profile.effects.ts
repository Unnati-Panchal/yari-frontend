import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromProfileActions from '~store/profile/profile.actions';
import {ProfileService} from '@yaari/services/profile/profile.service';
import {
  IAddRemoveImage,
  IBucket,
  IBucketItems,
  ICreateBucket,
  IImageResponse,
  IInsertBucket, IPickupAddress
} from '@yaari/models/profile/profile.interface';
import {IExchangeReturned, IPayment, IQualityScoreCard, IQuery, IRatingAndReviews} from '@yaari/models/product/product.interface';

@Injectable()
export class ProfileEffects {
  public getBuckets$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getBuckets),
      switchMap(() =>
        this._profileService.getBuckets().pipe(
          map((buckets: IBucket[]) => fromProfileActions.getBucketsSuccess({ buckets })),
          catchError(error => of(fromProfileActions.getBucketsError({ error })))
        )
      )
    )
  );

  public getBucketItems$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getBucketItems),
      map(action => action.bucketId),
      switchMap((bucketId: number) =>
        this._profileService.getBucketItems(bucketId).pipe(
          map((bucketItems: IBucketItems[]) => fromProfileActions.getBucketItemsSuccess({ bucketItems })),
          catchError(error => of(fromProfileActions.getBucketItemsError({ error })))
        )
      )
    )
  );

  public deleteBucketItem$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.deleteBucketItem),
      map(action => action.bucketId),
      switchMap((bucketId: number) =>
        this._profileService.deleteBucketItem(bucketId).pipe(
          map((response) => fromProfileActions.deleteBucketItemSuccess({ msg: response.msg })),
          catchError(error => of(fromProfileActions.deleteBucketItemError({ error })))
        )
      )
    )
  );

  public insertBucketItem$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.insertBucketItem),
      map(action => action.requestInsertBody),
      switchMap((requestInsertBody: IInsertBucket) =>
        this._profileService.insertBucketItem(requestInsertBody).pipe(
          map((response) => fromProfileActions.insertBucketItemSuccess({ msg: response.msg })),
          catchError(error => of(fromProfileActions.insertBucketItemError({ error })))
        )
      )
    )
  );

  public createBucket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.createBucket),
      map(action => action.requestCreateBody),
      switchMap((requestCreateBody: ICreateBucket) =>
        this._profileService.createBucket(requestCreateBody).pipe(
          map((response) => fromProfileActions.createBucketSuccess({ id: response.id })),
          catchError(error => of(fromProfileActions.createBucketError({ error })))
        )
      )
    )
  );

  public updateBucket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.updateBucket),
      map(action => action.requestCreateBody),
      switchMap((requestCreateBody: ICreateBucket) =>
        this._profileService.updateBucket(requestCreateBody).pipe(
          map((response) => fromProfileActions.updateBucketSuccess({ msg: response.msg })),
          catchError(error => of(fromProfileActions.updateBucketError({ error })))
        )
      )
    )
  );

  public addImageToBucket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.addImageToBucket),
      map(action => action.addImage),
      switchMap((addImage: IAddRemoveImage) =>
        this._profileService.addImageToBucket(addImage).pipe(
          map((response) => fromProfileActions.addImageToBucketSuccess({ msg: response.msg })),
          catchError(error => of(fromProfileActions.addImageToBucketError({ error })))
        )
      )
    )
  );


  public removeImage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.removeImage),
      map(action => action.removeImage),
      switchMap((removeImage: IAddRemoveImage) =>
        this._profileService.addImageToBucket(removeImage).pipe(
          map((response) => fromProfileActions.removeImageSuccess({ msg: response.msg })),
          catchError(error => of(fromProfileActions.removeImageError({ error })))
        )
      )
    )
  );

  public uploadImage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.uploadImage),
      map(action => action.file),
      switchMap((file: string) =>
        this._profileService.uploadImage(file).pipe(
          map((response) => fromProfileActions.uploadImageSuccess({ url: response.url })),
          catchError(error => of(fromProfileActions.uploadImageError({ error })))
        )
      )
    )
  );

  public getImages$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getImages),
      map(action => action.bucketId),
      switchMap((bucketId: number) =>
        this._profileService.getImages(bucketId).pipe(
          map((images: IImageResponse) => fromProfileActions.getImagesSuccess({ images })),
          catchError(error => of(fromProfileActions.getImagesError({ error })))
        )
      )
    )
  );

  public getSupplierSettlement$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getSupplierSettlement),
      map(action => action.query),
      switchMap((query: IQuery) =>
        this._profileService.getSupplierSettlement(query).pipe(
          map((payments: IPayment[]) => fromProfileActions.getSupplierSettlementSuccess({ payments })),
          catchError(error => of(fromProfileActions.getSupplierSettlementError(error)))
        )
      )
    )
  );

  public getRatingAndReviews$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getRatingAndReviews),
      switchMap(() =>
        this._profileService.getRatingAndReviews().pipe(
          map((ratingsAndReviews: IRatingAndReviews[]) => fromProfileActions.getRatingAndReviewsSuccess({ ratingsAndReviews })),
          catchError(error => of(fromProfileActions.getRatingAndReviewsError(error)))
        )
      )
    )
  );

  public getExchangedReturned$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getExchangedReturned),
      map(action => action.query),
      switchMap((query: IQuery) =>
        this._profileService.getExchangedReturned(query).pipe(
          map((exchangedReturned: IExchangeReturned[]) => fromProfileActions.getExchangedReturnedSuccess({ exchangedReturned })),
          catchError(error => of(fromProfileActions.getExchangedReturnedError(error)))
        )
      )
    )
  );

  public getQualityScoreCard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getQualityScoreCard),
      map(action => action.query),
      switchMap((query: IQuery) =>
        this._profileService.getQualityScoreCard(query).pipe(
          map((qualityScorecard: IQualityScoreCard[]) => fromProfileActions.getQualityScoreCardSuccess({ qualityScorecard })),
          catchError(error => of(fromProfileActions.getQualityScoreCardError(error)))
        )
      )
    )
  );

  public getPickupAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.getPickupAddress),
      switchMap(() =>
        this._profileService.getPickupAddress().pipe(
          map((pickupAddress: IPickupAddress) => fromProfileActions.getPickupAddressSuccess({ pickupAddress })),
          catchError(error => of(fromProfileActions.getPickupAddressError(error)))
        )
      )
    )
  );

  public addPickupAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProfileActions.addPickupAddress),
      map(action => action.pickupAddress),
      switchMap((address: IPickupAddress) =>
        this._profileService.addPickupAddress(address).pipe(
          map((pickupAddress: IPickupAddress) => fromProfileActions.addPickupAddressSuccess({ pickupAddress })),
          catchError(error => of(fromProfileActions.addPickupAddressError(error)))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _profileService: ProfileService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}

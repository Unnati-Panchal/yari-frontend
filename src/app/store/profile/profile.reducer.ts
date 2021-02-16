import { Action, createReducer, on } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import * as fromRoot from '~store/app.state';
import * as fromProfileActions from '~store/profile/profile.actions';

import {
  IAddRemoveImage,
  IBucket,
  IBucketItems,
  ICreateBucket,
  IImageResponse,
  IInsertBucket
} from '@yaari/models/profile/profile.interface';
import {IPayment, IRatingAndReviews} from '@yaari/models/product/product.interface';

export const profileFeatureKey = 'profile';

export interface IProfileState extends fromRoot.IAppState {
  loading: boolean;
  error: HttpErrorResponse;
  buckets: IBucket[];
  bucketId: number;
  bucketItems: IBucketItems[];
  requestInsertBody: IInsertBucket;
  msg: string;
  id: string;
  requestCreateBody: ICreateBucket;
  addImage: IAddRemoveImage;
  removeImage: IAddRemoveImage;
  file: string;
  url: string;
  images: IImageResponse;
  payments: IPayment[];
  ratingsAndReviews: IRatingAndReviews[];
}

export const profileInitialState: IProfileState = {
  loading: false,
  error: null,
  buckets: [],
  bucketItems: [],
  bucketId: null,
  requestInsertBody: null,
  msg: '',
  requestCreateBody: null,
  addImage: null,
  removeImage: null,
  file: '',
  url: '',
  id: '',
  images: null,
  payments: [],
  ratingsAndReviews: []
};

const profileReducer = createReducer(
  profileInitialState,
  on(fromProfileActions.getBuckets, (state) => ({...state, loading: true})),
  on(fromProfileActions.getBucketsSuccess, (state, action) => ({
    ...state,
    loading: false,
    buckets: action.buckets
  })),
  on(fromProfileActions.getBucketsError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.getBucketItems, (state, action) => ({
    ...state,
    loading: true,
    bucketId: action.bucketId
  })),
  on(fromProfileActions.getBucketItemsSuccess, (state, action) => ({
    ...state,
    loading: false,
    bucketItems: action.bucketItems
  })),
  on(fromProfileActions.getBucketItemsError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.deleteBucketItem, (state, action) => ({
    ...state,
    loading: true,
    bucketId: action.bucketId
  })),
  on(fromProfileActions.deleteBucketItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    msg: action.msg
  })),
  on(fromProfileActions.deleteBucketItemError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.insertBucketItem, (state, action) => ({
    ...state,
    loading: true,
    requestInsertBody: action.requestInsertBody
  })),
  on(fromProfileActions.insertBucketItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    msg: action.msg
  })),
  on(fromProfileActions.insertBucketItemError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.createBucket, (state, action) => ({
    ...state,
    loading: true,
    requestCreateBody: action.requestCreateBody
  })),
  on(fromProfileActions.createBucketSuccess, (state, action) => ({
    ...state,
    loading: false,
    id: action.id
  })),
  on(fromProfileActions.createBucketError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.updateBucket, (state, action) => ({
    ...state,
    loading: true,
    requestCreateBody: action.requestCreateBody
  })),
  on(fromProfileActions.updateBucketSuccess, (state, action) => ({
    ...state,
    loading: false,
    msg: action.msg
  })),
  on(fromProfileActions.updateBucketError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.addImageToBucket, (state, action) => ({
    ...state,
    loading: true,
    addImage: action.addImage
  })),
  on(fromProfileActions.addImageToBucketSuccess, (state, action) => ({
    ...state,
    loading: false,
    msg: action.msg
  })),
  on(fromProfileActions.addImageToBucketError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.removeImage, (state, action) => ({
    ...state,
    loading: true,
    removeImage: action.removeImage
  })),
  on(fromProfileActions.removeImageSuccess, (state, action) => ({
    ...state,
    loading: false,
    msg: action.msg
  })),
  on(fromProfileActions.removeImageError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.uploadImage, (state, action) => ({
    ...state,
    loading: true,
    file: action.file
  })),
  on(fromProfileActions.uploadImageSuccess, (state, action) => ({
    ...state,
    loading: false,
    url: action.url
  })),
  on(fromProfileActions.uploadImageError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.getImages, (state, action) => ({
    ...state,
    loading: true,
    bucketId: action.bucketId
  })),
  on(fromProfileActions.getImagesSuccess, (state, action) => ({
    ...state,
    loading: false,
    images: action.images
  })),
  on(fromProfileActions.getImagesError, (state, action) => ({ ...state, loading: false, error: action.error })),


  on(fromProfileActions.getSupplierSettlement, (state, action) => ({
    ...state,
    loading: true,
    query: action.query
  })),
  on(fromProfileActions.getSupplierSettlementSuccess, (state, action) => ({
    ...state,
    loading: false,
    payments: action.payments
  })),
  on(fromProfileActions.getSupplierSettlementError, (state, action) => ({ ...state, loading: false, error: action.error })),



  on(fromProfileActions.getRatingAndReviews, (state) => ({
    ...state,
    loading: true
  })),
  on(fromProfileActions.getRatingAndReviewsSuccess, (state, action) => ({
    ...state,
    loading: false,
    ratingsAndReviews: action.ratingsAndReviews
  })),
  on(fromProfileActions.getRatingAndReviewsError, (state, action) => ({ ...state, loading: false, error: action.error })),

);

// tslint:disable-next-line:typedef
export function reducer(state: IProfileState | undefined, action: Action) {
  return profileReducer(state, action);
}

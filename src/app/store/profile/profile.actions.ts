import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {
  IAddRemoveImage,
  IBucket,
  IBucketItems,
  ICreateBucket,
  IImageResponse,
  IInsertBucket, IPickupAddress
} from '@yaari/models/profile/profile.interface';
import {
  IExchangeReturned,
  IPayment,
  IQualityScoreCard,
  IQuery,
  IRatingAndReviews
} from '@yaari/models/product/product.interface';

export const getBuckets = createAction('[PROFILE] get buckets');

export const clearMessages = createAction('[PROFILE] clear messages');

export const getBucketsSuccess = createAction('[PROFILE] get buckets success', props<{ buckets: IBucket[] }>());

export const getBucketsError = createAction('[PROFILE] get buckets error', props<{ error: HttpErrorResponse }>());


export const getBucketItems = createAction('[PROFILE] get bucket items', props<{ bucketId: number }>());

export const getBucketItemsSuccess = createAction('[PROFILE] get bucket items success', props<{ bucketItems: IBucketItems[] }>());

export const getBucketItemsError = createAction('[PROFILE] get bucket items error', props<{ error: HttpErrorResponse }>());


export const deleteBucketItem = createAction('[PROFILE] delete bucket item', props<{ bucketId: number }>());

export const deleteBucketItemSuccess = createAction('[PROFILE] delete bucket item success', props<{ msg: string }>());

export const deleteBucketItemError = createAction('[PROFILE] delete bucket item error', props<{ error: HttpErrorResponse }>());


export const insertBucketItem = createAction('[PROFILE] insert bucket item', props<{ requestInsertBody: IInsertBucket }>());

export const insertBucketItemSuccess = createAction('[PROFILE] insert bucket item success', props<{ msg: string }>());

export const insertBucketItemError = createAction('[PROFILE] insert bucket item error', props<{ error: HttpErrorResponse }>());


export const createBucket = createAction('[PROFILE] create bucket', props<{ requestCreateBody: ICreateBucket }>());

export const createBucketSuccess = createAction('[PROFILE] create bucket success', props<{ id: string }>());

export const createBucketError = createAction('[PROFILE] create bucket error', props<{ error: HttpErrorResponse }>());


export const updateBucket = createAction('[PROFILE] update bucket', props<{ requestCreateBody: ICreateBucket }>());

export const updateBucketSuccess = createAction('[PROFILE] update bucket success', props<{ msg: string }>());

export const updateBucketError = createAction('[PROFILE] update bucket error', props<{ error: HttpErrorResponse }>());


export const addImageToBucket = createAction('[PROFILE] add image to bucket', props<{ addImage: IAddRemoveImage }>());

export const addImageToBucketSuccess = createAction('[PROFILE] add image to bucket success', props<{ msg: string }>());

export const addImageToBucketError = createAction('[PROFILE] add image to bucket error', props<{ error: HttpErrorResponse }>());


export const removeImage = createAction('[PROFILE] remove image', props<{ removeImage: IAddRemoveImage }>());

export const removeImageSuccess = createAction('[PROFILE] remove image success', props<{ msg: string }>());

export const removeImageError = createAction('[PROFILE] remove image error', props<{ error: HttpErrorResponse }>());


export const uploadImage = createAction('[PROFILE] upload image', props<{ file: string }>());

export const uploadImageSuccess = createAction('[PROFILE] upload image success', props<{ url: string }>());

export const uploadImageError = createAction('[PROFILE] upload image error', props<{ error: HttpErrorResponse }>());


export const getImages = createAction('[PROFILE] get images', props<{ bucketId: number}>());

export const getImagesSuccess = createAction('[PROFILE] get images success', props<{ images: IImageResponse }>());

export const getImagesError = createAction('[PROFILE] get images error', props<{ error: HttpErrorResponse }>());


export const getSupplierSettlement = createAction('[PROFILE] get supplier settlement', props<{ query: IQuery }>());

export const getSupplierSettlementSuccess = createAction('[PROFILE] get supplier settlement success', props<{ payments: IPayment[] }>());

export const getSupplierSettlementError = createAction('[PROFILE] get supplier settlement error', props<{ error: HttpErrorResponse }>());


export const getRatingAndReviews = createAction('[PROFILE] get ratings and reviews');

export const getRatingAndReviewsSuccess = createAction(
  '[PROFILE] get ratings and reviews success', props<{ ratingsAndReviews: IRatingAndReviews[] }>());

export const getRatingAndReviewsError = createAction('[PROFILE] get ratings and reviews error', props<{ error: HttpErrorResponse }>());


export const getExchangedReturned = createAction('[PROFILE] get exchanged and returned', props<{ query: IQuery }>());

export const getExchangedReturnedSuccess = createAction(
  '[PROFILE] get exchanged and returned success', props<{ exchangedReturned: IExchangeReturned[] }>());

export const getExchangedReturnedError = createAction('[PROFILE] get exchanged and returned error', props<{ error: HttpErrorResponse }>());


export const getQualityScoreCard = createAction('[PROFILE] get quality scorecard', props<{ query: IQuery }>());

export const getQualityScoreCardSuccess = createAction(
  '[PROFILE] get quality scorecard success', props<{ qualityScorecard: IQualityScoreCard[] }>());

export const getQualityScoreCardError = createAction('[PROFILE] get quality scorecard error', props<{ error: HttpErrorResponse }>());


export const getPickupAddress = createAction('[PROFILE] getPickupAddress');

export const getPickupAddressSuccess = createAction('[PROFILE] getPickupAddress success', props<{ pickupAddress: IPickupAddress }>());

export const getPickupAddressError = createAction('[PROFILE] getPickupAddress error', props<{ error: HttpErrorResponse }>());


export const addPickupAddress = createAction('[PROFILE] addPickupAddress', props<{ reqPickupAddress: IPickupAddress }>());

export const addPickupAddressSuccess = createAction('[PROFILE] addPickupAddress success', props<{ pickupAddress: IPickupAddress }>());

export const addPickupAddressError = createAction('[PROFILE] addPickupAddress error', props<{ error: HttpErrorResponse }>());

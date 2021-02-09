import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IBucket} from '@yaari/models/profile/profile.interface';

export const getBuckets = createAction('[PROFILE] get buckets');

export const getBucketsSuccess = createAction('[PROFILE] get buckets success', props<{ buckets: IBucket[]}>());

export const getBucketsError = createAction('[PROFILE] get buckets error', props<{ error: HttpErrorResponse }>());

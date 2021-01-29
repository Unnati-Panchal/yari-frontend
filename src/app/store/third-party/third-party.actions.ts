import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IGstPanResponse} from '@yaari/models/third-party/third-party.interface';

export const emailVerification = createAction('[THIRD_PARTY] email verification', props<{ email: string}>());

export const emailVerificationSuccess = createAction('[THIRD_PARTY] email verification success',
  props<{ emailVerificationResponse: IGstPanResponse}>());

export const emailVerificationError = createAction('[THIRD_PARTY] email verification error', props<{ error: HttpErrorResponse }>());


export const uploadGstCertificate = createAction('[THIRD_PARTY] upload gst certificate', props<{ certificate: string}>());

export const uploadGstCertificateSuccess = createAction('[THIRD_PARTY] upload gst certificate success',
  props<{ uploadedGstCertificate: IGstPanResponse}>());

export const uploadGstCertificateError = createAction('[THIRD_PARTY] upload gst certificate error', props<{ error: HttpErrorResponse }>());


export const uploadPanCard = createAction('[THIRD_PARTY] upload pan card', props<{ panCard: number}>());

export const uploadPanCardSuccess = createAction('[THIRD_PARTY] email verification success',
  props<{ uploadedPanCard: IGstPanResponse}>());

export const uploadPanCardError = createAction('[THIRD_PARTY] email verification error', props<{ error: HttpErrorResponse }>());

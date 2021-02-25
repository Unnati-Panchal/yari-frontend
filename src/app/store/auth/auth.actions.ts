import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import {
  IEditSupplierProfile,
  ILogin, IOnboarders,
  IRegistration,
  ISubmitKYCForVerificationResponse,
  IToken, IVerifyGstPan,
  IVerifyOtp,
  KYCDetailsResponse
} from '@yaari/models/auth/auth.interface';
import {IBulkUploadBasic, IFileUpload} from '@yaari/models/product/product.interface';

export const clearState = createAction('[AUTH] clear state');


export const registration = createAction('[AUTH] registration', props<{ regRequest: IRegistration }>());

export const registrationSuccess = createAction('[AUTH] registration success', props<{ regResponse: IRegistration }>());

export const registrationError = createAction('[AUTH] registration error', props<{ error: HttpErrorResponse }>());


export const editSupplier = createAction('[AUTH] edit registration', props<{ supplierProfileChanges: IEditSupplierProfile }>());

export const editSupplierSuccess = createAction('[AUTH] edit registration success', props<{ regResponse: IRegistration }>());

export const editSupplierError = createAction('[AUTH] edit registration error', props<{ error: HttpErrorResponse }>());


export const supplierDetails = createAction('[AUTH] supplier details');

export const supplierDetailsSuccess = createAction('[AUTH] supplier details success', props<{ supplierDetails: IRegistration }>());

export const supplierDetailsError = createAction('[AUTH] supplier details error', props<{ error: HttpErrorResponse }>());



export const login = createAction('[AUTH] login', props<{ loginRequest: ILogin }>());

export const loginSuccess = createAction('[AUTH] login success', props<{ token: IToken }>());

export const loginError = createAction('[AUTH] login error', props<{ error: HttpErrorResponse }>());


export const passwordRecovery = createAction('[AUTH] password recovery', props<{ email: string }>());

export const passwordRecoverySuccess = createAction('[AUTH] password recovery success', props<{ passwordRecoveryResponse: string }>());

export const passwordRecoveryError = createAction('[AUTH] password recovery error', props<{ error: HttpErrorResponse }>());


export const submitKYCForVerification = createAction('[AUTH] submit KYC Verification', props<{ KYCVerification: IRegistration }>());

export const submitKYCForVerificationSuccess = createAction('[AUTH] submit KYC Verification success',
  props<{ submitKYCForVerificationResponse: ISubmitKYCForVerificationResponse }>());

export const submitKYCForVerificationError = createAction('[AUTH] submit KYC Verification error', props<{ error: HttpErrorResponse }>());


export const panVerification = createAction('[AUTH] panVerification', props<{ panReq: IVerifyGstPan }>());

export const panVerificationSuccess = createAction('[AUTH] panVerification success', props<{ panVerification: KYCDetailsResponse }>());

export const panVerificationError = createAction('[AUTH] panVerification error', props<{ error: HttpErrorResponse }>());


export const gstVerification = createAction('[AUTH] gstVerification', props<{ gstReq: IVerifyGstPan }>());

export const gstVerificationSuccess = createAction('[AUTH] gstVerification success', props<{ gstVerification: KYCDetailsResponse }>());

export const gstVerificationError = createAction('[AUTH] gstVerification error', props<{ error: HttpErrorResponse }>());


export const bankVerification = createAction('[AUTH] bankVerification');

export const bankVerificationSuccess = createAction('[AUTH] bankVerification success', props<{ bankVerification: KYCDetailsResponse }>());

export const bankVerificationError = createAction('[AUTH] bankVerification error', props<{ error: HttpErrorResponse }>());


export const generateOtp = createAction('[AUTH] generateOtp', props<{ email: string }>());

export const generateOtpSuccess = createAction('[AUTH] generateOtp success', props<{ generateOtp: KYCDetailsResponse }>());

export const generateOtpError = createAction('[AUTH] generateOtp error', props<{ error: HttpErrorResponse }>());


export const verifyOtp = createAction('[AUTH] verifyOtp', props<{ verifyOtp: IVerifyOtp }>());

export const verifyOtpSuccess = createAction('[AUTH] verifyOtp success', props<{ verifyOtpResponse: KYCDetailsResponse }>());

export const verifyOtpError = createAction('[AUTH] verifyOtp error', props<{ error: HttpErrorResponse }>());


export const approveKYC = createAction('[AUTH] approveKYC', props<{ approveKYC: IRegistration }>());

export const approveKYCSuccess = createAction('[AUTH] approveKYC success', props<{ approveKYCResponse: IRegistration }>());

export const approveKYCError = createAction('[AUTH] approveKYC error', props<{ error: HttpErrorResponse }>());


export const getOnboarders = createAction('[AUTH] get onboarders');

export const getOnboardersSuccess = createAction('[AUTH] get onboarders success', props<{ onBoarders: IOnboarders[] }>());

export const getOnboardersError = createAction('[AUTH] get onboarders error', props<{ error: HttpErrorResponse }>());

export const uploadSupplierPicture = createAction('[PRODUCTS] supplierPicture', props<{ fileUpload: File }>());

export const uploadSupplierPictureSuccess =
  createAction('[PRODUCTS] supplierPicture success', props<{ url: string }>());

export const uploadSupplierPictureError = createAction('[PRODUCTS] supplierPicture error', props<{ error: HttpErrorResponse }>());

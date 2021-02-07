import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import {
  ILogin,
  IRegistration,
  ISubmitKYCForVerificationResponse,
  IToken, IVerifyGstPan,
  IVerifyOtp,
  KYCDetailsResponse
} from '@yaari/models/auth/auth.interface';

export const clearState = createAction('[AUTH] clear state');


export const registration = createAction('[AUTH] registration', props<{ regRequest: IRegistration }>());

export const registrationSuccess = createAction('[AUTH] registration success', props<{ regResponse: IRegistration }>());

export const registrationError = createAction('[AUTH] registration error', props<{ error: HttpErrorResponse }>());


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

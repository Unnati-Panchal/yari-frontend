export interface IRegistration {
  profile_image?: string;
  contact_person: string;
  phone_no: number;
  email_id: string;
  city: string;
  type: string;
  price_range_min: number;
  price_range_max: number;
  average_monthly_stock: number;
  primary_category_id: number;

  // submitKYCForVerification
  gst_no: string;
  pan_no: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_ifsc: string;
  bank_account_type: string;

  // edit profile
  is_active?: boolean;
  name_pan_card?: string;

  primary_category_name?: string;

  state?: string;
  onboarder_id?: number;
  id?: number;
  approved?: boolean;
  kyc_verified?: boolean;
}

export interface IAdminDetails{
  admin_role: string;
}

export interface ILogin {
  username: string;
  password: string;
  user_role: string;
}

export interface IToken {
  access_token: string;
  access_token_expiry: string;
  refresh_token: string;
}

export interface ISubmitKYCForVerificationResponse {
  // submitKYCForVerification
  gst_no: string;
  pan_no: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_ifsc: string;
  bank_account_type: string;
}

export interface KYCDetailsResponse {
  // submitKYCForVerification
  gst_no: string;
  pan_no: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_ifsc: string;
  bank_account_type: string;

  email_id?: string;
  is_active?: boolean;
  status?: number;
  message?: string;
  otp?: number;

  details?: string;
}

export interface IVerifyOtp {
  otp: number;
  email: string;
}

export interface IVerifyGstPan {
  name: number;
  gst_no?: string;
  pan_no?: string;
}

export interface IOnboarders {
  id: number;
  name: string;
}


export interface IEditSupplierProfile {
  contact_person?: string;
  phone_no?: number;
  email_id?: string;
  bank_account_name?: string;
  bank_account_number?: string;
  bank_name?: string;
  bank_ifsc?: string;
}


export interface IResetPassword {
  access_token: string;
  new_password: string;
}

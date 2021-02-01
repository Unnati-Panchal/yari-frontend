export interface IRegistration {
  contact_person: string;
  phone_no: number;
  email_id: string;
  city: string;
  type: string;
  price_range_min: number;
  price_range_max: number;
  average_monthly_stock: number;
  primary_category_id: number;
  has_gst: boolean;
}

export interface ILogin {
  username: string;
  password: string;
  user_role: string;
}

export interface IToken {
  access_token: string;
  access_token_expiry: string;
  otp: string;
  refresh_token: string;
  token_type: string;
}


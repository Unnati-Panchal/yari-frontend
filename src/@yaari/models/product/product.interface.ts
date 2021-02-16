export interface ICategory {
  id: number;
  name: string;
}


export interface IFileUpload {
  file: File;
  sub_category_id: number;
}


export interface IBulkUploadBasic {
  id: number;
  sub_category_name: string;
  created_time: string;
  approved: boolean;
  viewed: number;
  shared: number;
}

export interface IQuery {
  startDate: string | number;
  endDate: string | number;
}

export interface ISpecifications {
  catalog_id: string;
  details: ISpec[];
}


export interface ISpec {
  sku_id: string;
  next_day_dispatch: boolean;
  specifications: any;
}

export interface IPayment {
  order: {
    id: string;
    status: string;
    total_price: number;
    total_tax: number;
    shipping_charges: number;
    total_discount: number;
    total_reseller_margin: number;
    reseller: {
      first_name: string;
      phone_no: string;
      last_name: string;
      email_id: string;
      security_image_url: string;
      country_code: string;
    }
  };
  supplier: {
    id: string;
    contact_person: string;
    phone_no: string;
    pan_no: string;
    bank_account_name: string;
    bank_account_number: string;
    bank_name: string;
    bank_ifsc: string;
    bank_account_type: string;
    approved: true
  };
  status: string;
  created_time: string;
  discard_reason: string;
}


export interface IRatingAndReviews {
  id: number;
  sku_id: string;
  product_name: string;
  brand: string;
  mrp: number;
  sp: number;
  description: string;
  material_care: string;
  discount: number;
  country_of_origin: string;
  guarantee: string;
  key_features: string;
  manufacturing_date: string;
  re_stock_date: string;
  video_url: string;
  warranty: string;
  rating: number;
  reviews: string[];
}

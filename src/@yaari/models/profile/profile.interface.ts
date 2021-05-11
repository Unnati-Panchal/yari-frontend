export interface IBucket {
  name: string;
  bucket_description: string;
  end_time: string;
  id: string;
  file_url: string[];
}

export interface IBucketItems {
  bucket_id: number;
  sort_key: string;
  sort_value: string;
  analytic_key: string;
  analytic_value: string;
  bucket_type: string;
  filter_key: string;
  filter_value: string;
  filter_match: string;
}


export interface IInsertBucket {
  sort_item: {
    sort_key: string;
    sort_order: string;
  };
  analytic_item: {
    analytic_key: string;
    analytic_order: string;
  };
  filter_item: {
    filter_key: string;
    filter_condition: string;
    filter_value: string;
  };
  sku_items: number[];
  bucket_type: string;
  bucketId?: number;
}

export interface ICreateBucket {
  bucket_name: string;
  bucket_description: string;
  end_day: {
    year: number;
    month: number
    day: number
  };
  priority: number;
  image_urls?: string[];
  bucketId?: number;
}

export interface IAddRemoveImage {
  url: string;
  bucketId: number;
}


export interface IImageResponse {
  url: string;
  bucket_id: number;
}

export interface IPickupAddress {
  full_name?: string;
  phone_no?: string;
  country?: string;
  pin_code?: string;
  line_one?: string;
  line_two?: string;
  landmark?: string;
  city?: string;
  state?: string;
  type?: string;
  id?: number;
}


export interface IFileKYC {
  gst_certificate?: File;
  pan_card?: File;
  cancelled_cheque?: File;
  msme_certificate?: File;
  file?: File;
  upload_token?: string;
}

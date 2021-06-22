export interface IUploadedCatalogue {
  catalogue_id: string;
  product_count: string;
  supplier_business_name: string;
  catalogue_name: string;
  category_name: string;
}

export interface ICatalogueProducts {
  id: number;
  sku_id: string;
  product_name: string;
  brand: string;
  mrp: number;
  sp: number;
  inventory: number;
  description: string;
  material_care: string;
  discount: string;
  country_of_origin: string;
  guarantee: string;
  key_features: string;
  video_url: string;
  warranty: string;
  discount_start_date: string;
  discount_end_date: string;
  manufacturing_date: string;
  re_stock_date: string;
  specifications: any;
  product_img: any;
  product_catalog: any;
  comment: string;
}


export interface ICatalogueApprove {
  approved: string;
  catalogue_id: string;
  product_comments: any[];
}

export interface IResMsg {
  success: boolean;
  msg: string;
}

export interface ICatalogueContentManagement {
  id: number;
  sku_id: string;
  product_catalog: IProductCatalog;
  checked?: boolean;
}

interface IProductCatalog {
  id: number;
  category: ICategory;
  supplier: ISupplier;
}

interface ICategory {
  id: number;
  name: string;
}

interface ISupplier {
  id: number;
  contact_person: string;
}


export interface IProductDetail {
  id: number;
  sku_id: string;
  product_name: string;
  brand: string;
  mrp: number;
  sp: number;
  inventory: number;
  description: string;
  material_care: string;
  discount: number;
  country_of_origin: string;
  guarantee: string;
  key_features: string;
  video_url: string;
  warranty: string;
  supplier_name: string;
  discount_start_date: string;
  discount_end_date: string;
  manufacturing_date: string;
  re_stock_date: string;
  specifications: { key: string, name: string }[];
  product_img: IProductImg[];
  hsn_code: string;
  product_id: string;
  group_id: string;
  product_catalog: IProductCatalog;
  offers: string;
}

interface IProductImg {
  url: string;
}

interface IProductCatalog {
  category: ICategory;
}

interface ICategory {
  id: number;
  name: string;
}


export interface IEditProduct {
  id: number;
  description: string;
  key_features: string;
  guarantee: string;
  warranty: string;
  mrp: number;
  sp: number;
  specifications: string;
  to_delete_image_urls: string[];
  new_images: NewImage[];
  to_delete_video_url: string;
  new_video: NewVideo;
}

export interface NewImage {
  media_name: string;
  media_bytes: string;
}

export interface NewVideo {
  media_name: string;
  media_bytes: string;
}

export interface IProductCategory {
  id: number;
  name: string;
}

export interface IAdminUserDetails {
  first_name: string;
  last_name: string;
  phone_no: string;
  email_id: string;
  admin_role: string;
  admin_designation: string;
}

export interface IPricingCatalogue {
  id: number;
  catalogue_name: string;
  product_count: string;
  category: string;
  supplier_business_name: string;
  uploaded_by: string;
  uploaded_date: string;
  approved_by: string;
  approved_date: string;
}

export interface IPricingProduct {
  id: number;
  sku_id: string;
  product_name: string;
  product_id: string;
  group_id: string;
  mrp: number;
  sp: number;
  offers: string;
  comment: string;
}

export interface IPricingEdit {
  id: number;
  sku_id: string;
  product_id: string;
  mrp: number;
  sp: number;
  offers: string;
  comment: string;

}

export interface ISupplierList {
  id: number;
  contact_person: string;
  email_id: string;
}

export interface ISupplierDetails {
  id: number;
  contact_person: string;
  email_id: string;
  phone_no: string;
  state: string;
  city: string;
  primary_category_name: string;
  type: string;
  average_monthly_stock: string;
  gst_no: string;
  pan_no: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_ifsc: string;
  gst_certificate: string;
  pan_card: string;
  supplier_status: string;
  quality_report: string;
  total_volume_sold: string;
  total_price_sold: string;
  total_volume_returns: string;
  total_price_returns: string;
  total_volume_exchange: string;
  name_pan_card?: string;
  price_range_min?: string;
  price_range_max?: string;
  cancelled_cheque?: string;
  msme_certificate?: string;
}

export interface ICatalog {
  id: number;
  catalogue_name: string;
  catalogue_uploaded_by: string;
  catalogue_uploaded_date: string;
  catalogue_status: string;
  category_name: string;
  supplier_business_name: string;
}

export interface IFilter {
  filterBy?: string;
  limit?: number;
  skip?: number;
}

export interface ISupplierOnboard {
  supplier_id: string;
  approve: boolean;
  comment: string;
}

export interface IMsgResponse {
  success: boolean;
  msg: string;
}

export interface IComplaints {
  id: number;
  supplier?: {
    id: number;
    contact_person: string;
    email_id: string;
    phone_no: string;
    rating: string;
  };
  reseller?: {
    id: number;
    business_name: string;
    email_id: string;
    phone_no: string;
  };
  category: {
    id: number;
    name: string;
  };
  grievance: string;
  action: string;
  handeling_team: string;
}

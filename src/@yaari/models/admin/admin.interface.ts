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

export interface IAdminUserDetails {
    first_name: string;
    last_name: string;
    phone_no: string;
    email_id: string;
    admin_role: string;
    admin_designation: string;
}

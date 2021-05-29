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
    product_name: string;
    product_sku_id: string;
    product_description: string;
    product_category: number;
    material_care: string;
    mrp: string;
    final_selling_price: string;
    stock_count: number;
    re_stock_date: string;
    manufacturing_date: string;
    country_of_origin: string;
    key_feature: string;
    offer: string;
    offer_start_date: string;
    offer_end_date: string;
    guarantee: string;
    warranty: string;
    images: string[];
    videos: string[];
    size_chart: string;
    color_chart: string;
    neck_pattern: string;
    sleeve_length: string;
    kurti_length: string;
    hemline: string;
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
    sku_id: string;
    mrp: number;
    sp: number;
    offers: string;
    comment: string;
}

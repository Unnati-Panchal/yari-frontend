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
  startDate: string;
  endDate: string;
}

export interface ISpecifications {
  catalog_id: string;
  sku_id: string;
  next_day_dispatch: boolean;
  specifications: {val: string}[];
}

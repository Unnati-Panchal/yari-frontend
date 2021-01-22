export interface ISupplierRegistration {
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

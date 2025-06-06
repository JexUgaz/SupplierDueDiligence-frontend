export interface Supplier {
  id?: number;
  businessName: string;
  commercialName?: string;
  taxId: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  address?: string;
  country: string;
  annualRevenue?: number;
  lastUpdated: string;
}

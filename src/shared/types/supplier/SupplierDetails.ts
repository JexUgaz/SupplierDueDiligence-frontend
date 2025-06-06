import type { Country } from "@/shared/types/countries/Country";

export interface SupplierDetails {
  id: number;
  businessName: string;
  commercialName?: string;
  taxId: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  address?: string;
  country: Country;
  annualRevenue?: number;
  lastUpdated: string;
}

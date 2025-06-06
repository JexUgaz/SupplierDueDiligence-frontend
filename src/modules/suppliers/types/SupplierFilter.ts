export type SupplierFilter = Partial<{
  businessName: string;
  countryId: number;
  taxId: string;
  lastUpdatedFrom: string;
  lastUpdatedTo: string;
}>;

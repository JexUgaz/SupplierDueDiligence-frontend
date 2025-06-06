import { SupplierDueDiligenceApi } from "@/shared/contracts/apis/SupplierDueDiligenceApi";
import type { ICountryService } from "@/shared/contracts/services/ICountryService";
import type { Country } from "@/shared/types/countries/Country";

export class CountryService
  extends SupplierDueDiligenceApi
  implements ICountryService
{
  apiBase: string = "/countries";

  getAll(): Promise<Country[] | null> {
    return super.request<Country[]>({
      endpoint: "",
    });
  }
}

import { SupplierDueDiligenceApi } from "@/shared/contracts/apis/SupplierDueDiligenceApi";
import type {
  ISupplierService,
  SupplierQueryParams,
} from "@/shared/contracts/services/ISupplierService";
import type { PaginatedResult } from "@/shared/types/pagination";
import type { Supplier, SupplierDetails } from "@/shared/types/supplier";
import type { SupplierEditable } from "@/shared/types/supplier/SupplierEditable";

export class SupplierService
  extends SupplierDueDiligenceApi
  implements ISupplierService
{
  apiBase: string = "/supplier";

  getAll(
    query: SupplierQueryParams
  ): Promise<PaginatedResult<Supplier> | null> {
    const { filters } = query;
    const queryParams: Record<string, string> = {
      ...(filters.businessName && { businessName: filters.businessName }),
      ...(filters.countryId !== undefined && {
        countryId: String(filters.countryId),
      }),
      ...(filters.taxId && { taxId: filters.taxId }),
      ...(filters.lastUpdatedFrom && {
        lastUpdatedFrom: filters.lastUpdatedFrom,
      }),
      ...(filters.lastUpdatedTo && { lastUpdatedTo: filters.lastUpdatedTo }),
      page: String(query.page),
      pageSize: String(query.pageSize),
    };

    return super.request<PaginatedResult<Supplier>>({
      endpoint: "",
      queryParams,
    });
  }

  getById(id: number): Promise<SupplierDetails | null> {
    return this.request<SupplierDetails>({
      endpoint: `/${id}`,
    });
  }
  delete(id: number): Promise<boolean | null> {
    return this.request<boolean>({
      endpoint: `/${id}`,
      method: "DELETE",
      showSuccessMessage: true,
    });
  }
  create(supplier: SupplierEditable): Promise<SupplierDetails | null> {
    return this.request<SupplierDetails>({
      endpoint: "",
      method: "POST",
      body: supplier,
      showSuccessMessage: true,
    });
  }
  update(
    id: number,
    supplier: SupplierEditable
  ): Promise<SupplierDetails | null> {
    return this.request<SupplierDetails>({
      endpoint: `/${id}`,
      method: "PUT",
      body: supplier,
      showSuccessMessage: true,
    });
  }
}

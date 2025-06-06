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
    const queryParams: Record<string, string> = {
      ...(query.businessName && { businessName: query.businessName }),
      ...(query.countryId !== undefined && {
        countryId: String(query.countryId),
      }),
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

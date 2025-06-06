import type { PaginatedResult } from "@/shared/types/pagination";
import type { SupplierDetails, Supplier } from "@/shared/types/supplier";
import type { SupplierEditable } from "@/shared/types/supplier/SupplierEditable";

export interface SupplierQueryParams {
  businessName?: string;
  countryId?: number;
  page: number;
  pageSize: number;
}

export interface ISupplierService {
  /**
   * Fetches paginated and filtered list of suppliers.
   */
  getAll(query: SupplierQueryParams): Promise<PaginatedResult<Supplier> | null>;

  /**
   * Fetches detailed info of a single supplier.
   */
  getById(id: number): Promise<SupplierDetails | null>;

  /**
   * Deletes a supplier by ID.
   */
  delete(id: number): Promise<boolean | null>;

  /**
   * Creates a new supplier.
   */
  create(supplier: SupplierEditable): Promise<SupplierDetails | null>;

  /**
   * Updates an existing supplier.
   */
  update(
    id: number,
    supplier: SupplierEditable
  ): Promise<SupplierDetails | null>;
}

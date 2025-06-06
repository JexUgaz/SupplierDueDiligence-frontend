import type { PaginatedResult } from "@/shared/types/pagination";
import type { Supplier } from "@/shared/types/supplier/Supplier";
import { useCallback, useRef, useState } from "react";
import { SupplierTable } from "@/modules/suppliers/components/SupplierTable";
import { useNavigate } from "react-router-dom";
import { SuppliersTableSkeleton } from "@/modules/suppliers/components/SuppliersTableSkeleton";
import { TablePaginationControls } from "@/shared/components/table/TablePaginationControls";
import { supplierService } from "@/modules/suppliers/services";
import SupplierFiltersTable from "@/modules/suppliers/components/SupplierFiltersTable";
import type { SupplierFilter } from "@/modules/suppliers/types/SupplierFilter";

const SupplierListPage = () => {
  const navigate = useNavigate();
  const pageSize = 10;
  const [dataPage, setDataPage] = useState<PaginatedResult<Supplier> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const filtersRef = useRef<SupplierFilter>({});
  const currentPageRef = useRef<number>(1);
  const metadata = dataPage?.pagination;

  const fetchData = useCallback(async () => {
    setLoading(true);
    const page = currentPageRef.current;
    const filters = filtersRef.current;
    try {
      const result = await supplierService.getAll({
        filters,
        page,
        pageSize: pageSize,
      });
      if (result == null) return;
      setDataPage(result);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const onPagination = (newPage: number) => {
    currentPageRef.current = newPage;
    fetchData();
  };

  const showSkeleton = loading && !dataPage;

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Suppliers Inventory
          </h1>
          <p className="text-gray-600 text-[14px] md:text-sm">
            List of suppliers ordered by last updated date.
          </p>
        </div>
        <button
          onClick={() =>
            navigate("/app/new", { state: { from: location.pathname } })
          }
          className="px-4 py-1 mt-4 text-white text-[14px] font-medium rounded-md hover:brightness-90 transition bg-nexora-accent cursor-pointer md:text-sm"
        >
          + Add New Supplier
        </button>
      </div>

      <SupplierFiltersTable
        updateFilters={(filters) => (filtersRef.current = filters)}
        onFetchData={fetchData}
      />

      {showSkeleton && <SuppliersTableSkeleton />}
      {!showSkeleton && (
        <SupplierTable data={dataPage!.data} onRefresh={fetchData} />
      )}

      {!showSkeleton && (
        <TablePaginationControls
          metadata={metadata!}
          loading={loading}
          onNext={onPagination}
          onPrevious={onPagination}
        />
      )}
    </div>
  );
};

export { SupplierListPage };

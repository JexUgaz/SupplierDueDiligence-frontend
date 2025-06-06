import React, { useCallback, useEffect, useState } from "react";
import type { SupplierFilter } from "@/modules/suppliers/types/SupplierFilter";
import FilterInput from "@/shared/components/inputs/FilterInput";
import FilterSelect from "@/shared/components/selects/FilterSelect";
import FilterDateInput from "@/shared/components/inputs/FilterDateInput ";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FiltersSkeleton } from "./FiltersSkeleton";
import type { Country } from "@/shared/types/countries/Country";
import { countryService } from "@/modules/suppliers/services";

type Props = {
  onFetchData: () => void;
  updateFilters: (filters: SupplierFilter) => void;
};

const SupplierFiltersTable: React.FC<Props> = ({
  onFetchData,
  updateFilters,
}) => {
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SupplierFilter>({});

  useEffect(() => {
    onFetchData();
  }, [onFetchData]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const countries = await countryService.getAll();
        setCountries(countries);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  const onInputChange = useCallback(
    (field: keyof SupplierFilter, value: string | number) => {
      const newFilters: SupplierFilter = {
        ...filters,
        [field]: value,
      };

      setFilters(newFilters);
      updateFilters(newFilters);
      onFetchData();
    },
    [filters, updateFilters, onFetchData]
  );

  if (loadingCountries || !countries) return <FiltersSkeleton />;

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowFilters(!showFilters)}
          type="button"
          aria-label={showFilters ? "Hide filters" : "Show filters"}
          className="md:hidden p-2 flex items-center gap-2 text-nexora-accent text-sm"
          style={{ backgroundColor: "transparent" }}
        >
          <span className="select-none">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </span>
          {showFilters ? (
            <EyeSlashIcon className="w-6 h-6 text-nexora-accent" />
          ) : (
            <EyeIcon className="w-6 h-6 text-nexora-accent" />
          )}
        </button>
      </div>
      <div
        className={`bg-gray-100 rounded-2xl p-4 mb-4
          grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4
          ${showFilters ? "block" : "hidden"} md:grid`}
      >
        <FilterInput
          label="Business Name"
          placeholder="Business Name"
          value={filters.businessName}
          onChange={(val) => onInputChange("businessName", val)}
          debounceDelay={500}
        />
        <FilterInput
          label="Tax ID"
          placeholder="Tax ID"
          value={filters.taxId}
          onChange={(val) => onInputChange("taxId", val)}
          debounceDelay={500}
        />
        <FilterSelect
          label="Select Country"
          value={filters.countryId}
          onChange={(val) => onInputChange("countryId", val)}
          placeholder="Select Country"
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
        />
        <FilterDateInput
          id="last-updated-from"
          label="Updated From"
          value={filters.lastUpdatedFrom}
          onChange={(val) => onInputChange("lastUpdatedFrom", val)}
        />
        <FilterDateInput
          id="last-updated-to"
          label="Updated To"
          value={filters.lastUpdatedTo}
          onChange={(val) => onInputChange("lastUpdatedTo", val)}
        />
      </div>
    </div>
  );
};

export default SupplierFiltersTable;

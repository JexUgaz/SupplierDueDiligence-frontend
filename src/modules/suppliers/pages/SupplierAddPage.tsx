import { useEffect, useState } from "react";
import { SupplierFormEditable } from "@/modules/suppliers/components/SupplierFormEditable";
import SupplierFormSkeleton from "@/modules/suppliers/components/SupplierFormSkeleton";
import { countryService } from "@/modules/suppliers/services";
import type { Country } from "@/shared/types/countries/Country";

const SupplierAddPage = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const countries = await countryService.getAll();
        setCountries(countries);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading || !countries) return <SupplierFormSkeleton />;

  return <SupplierFormEditable countries={countries} />;
};

export { SupplierAddPage };

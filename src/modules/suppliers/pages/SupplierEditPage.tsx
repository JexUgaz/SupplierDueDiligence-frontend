import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SupplierFormEditable } from "@/modules/suppliers/components/SupplierFormEditable";
import SupplierFormSkeleton from "@/modules/suppliers/components/SupplierFormSkeleton";
import type { SupplierDetails } from "@/shared/types/supplier";
import { countryService, supplierService } from "@/modules/suppliers/services";
import type { Country } from "@/shared/types/countries/Country";

const SupplierEditPage = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [supplier, setSupplier] = useState<SupplierDetails | null>(null);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supplierId = Number(id);
    if (!id || isNaN(supplierId)) return;

    const fetchData = async () => {
      setLoading(true);
      const [supplier, countries] = await Promise.all([
        supplierService.getById(supplierId),
        countryService.getAll(),
      ]);
      if (!supplier || !countries) return navigation("/not-found");
      setSupplier(supplier);
      setCountries(countries);
      setLoading(false);
    };
    fetchData();
  }, [id, navigation]);

  if (!id || isNaN(Number(id))) return <Navigate to="/not-found" />;
  if (loading || !supplier || !countries) return <SupplierFormSkeleton />;

  return <SupplierFormEditable initialData={supplier} countries={countries} />;
};

export { SupplierEditPage };

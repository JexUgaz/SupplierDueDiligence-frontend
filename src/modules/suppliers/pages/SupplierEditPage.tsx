import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SupplierFormEditable } from "@/modules/suppliers/components/SupplierFormEditable";
import SupplierFormSkeleton from "@/modules/suppliers/components/SupplierFormSkeleton";
import type { SupplierDetails } from "@/shared/types/supplier";
import { countryService, supplierService } from "@/modules/suppliers/services";
import type { Country } from "@/shared/types/countries/Country";

const SupplierEditPage = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [supplier, setSupplier] = useState<SupplierDetails | null>(null);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);

  //  console.error("Error loading supplier", err);
  //     navigate("/not-found"); // o mostrar error

  useEffect(() => {
    const supplierId = Number(id);
    if (!id || isNaN(supplierId)) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [supplier, countries] = await Promise.all([
          supplierService.getById(supplierId),
          countryService.getAll(),
        ]);
        if (!supplier || !countries) return;
        setSupplier(supplier);
        setCountries(countries);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!id || isNaN(Number(id))) return null; // o <Navigate to="/not-found" />
  if (loading || !supplier || !countries) return <SupplierFormSkeleton />;

  return <SupplierFormEditable initialData={supplier} countries={countries} />;
};

export { SupplierEditPage };

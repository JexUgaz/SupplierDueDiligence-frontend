import { BackButton } from "@/shared/components/buttons/BackButton";
import { useParams } from "react-router-dom";
import { SupplierDetailsSkeleton } from "@/modules/suppliers/components/SupplierDetailsSkeleton";
import { supplierService } from "@/modules/suppliers/services";
import type { SupplierDetails } from "@/shared/types/supplier";
import { useEffect, useState } from "react";

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<SupplierDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const idIsNotNumber = isNaN(Number(id));
  const isNotFound = !id || idIsNotNumber;

  useEffect(() => {
    if (isNotFound) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await supplierService.getById(Number(id));
        if (!result) return;
        setSupplier(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isNotFound, id]);

  if (isNotFound) return <div>Not found</div>;
  if (loading || !supplier) return <SupplierDetailsSkeleton />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-nexora-white rounded-2xl shadow-md font-sans text-nexora-text max-h-full min-h-[70%] relative">
      <div className="flex justify-start mb-6">
        <BackButton />
        <h2 className="text-lg md:text-2xl font-bold">Supplier Details</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Business Name
          </h3>
          <p className="text-sm md:text-base">{supplier.businessName}</p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Commercial Name
          </h3>
          <p className="text-sm md:text-base">
            {supplier.commercialName ?? "-"}
          </p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Tax ID
          </h3>
          <p className="text-sm md:text-base">{supplier.taxId}</p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Phone Number
          </h3>
          <p className="text-sm md:text-base">{supplier.phoneNumber ?? "-"}</p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Email
          </h3>
          <p className="text-sm md:text-base">{supplier.email ?? "-"}</p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Website
          </h3>
          <p className="text-sm md:text-base">
            {supplier.website ? (
              <a
                href={supplier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nexora-accent hover:underline"
              >
                {supplier.website}
              </a>
            ) : (
              "-"
            )}
          </p>
        </div>

        <div className="sm:col-span-2">
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Address
          </h3>
          <p className="text-sm md:text-base">{supplier.address ?? "-"}</p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Country
          </h3>
          <p className="text-sm md:text-base">{supplier.country.name}</p>
        </div>

        <div>
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Annual Revenue
          </h3>
          <p className="text-sm md:text-base">
            {supplier.annualRevenue !== undefined
              ? `$${supplier.annualRevenue.toLocaleString()}`
              : "-"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <h3 className="font-medium text-nexora-darkest text-sm md:text-base">
            Last Updated
          </h3>
          <p className="text-sm md:text-base">
            {new Date(supplier.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export { SupplierDetailsPage };

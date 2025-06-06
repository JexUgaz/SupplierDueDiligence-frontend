import { IconTooltipButton } from "@/shared/components/buttons/IconTooltipButton";
import type { Supplier } from "@/shared/types/supplier/Supplier";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SupplierDeleteModal } from "./SupplierDeleteModal";
import { ScreeningModal } from "@/modules/suppliers/components/ScreeningModal";
import { StringFormatHelper } from "@/shared/helpers/StringFormatHelper";

interface Props {
  readonly data: Supplier[];
  readonly onRefresh: () => Promise<void>;
}
const SupplierTable = ({ data, onRefresh }: Props) => {
  const navigate = useNavigate();
  const [supplierSelected, setSupplierSelected] = useState<Supplier | null>(
    null
  );

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [screeningOpen, setScreeningOpen] = useState<boolean>(false);

  const onDelete = (supplier: Supplier) => {
    setSupplierSelected(supplier);
    setDeleteOpen(true);
  };

  const onScreening = (supplier: Supplier) => {
    setSupplierSelected(supplier);
    setScreeningOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto md:overflow-hidden">
        <table className="w-full divide-y divide-gray-200 mt-2">
          <thead className="bg-nexora-light">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-nexora-gray-dark uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-nexora-gray-dark uppercase tracking-wider">
                Tax ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-nexora-gray-dark uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-nexora-gray-dark uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-nexora-gray-dark uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-nexora-gray-light">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500 italic text-sm"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              data.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-nexora-light">
                  <td className="px-6 py-4 text-sm text-nexora-text">
                    {supplier.businessName}
                  </td>
                  <td className="px-6 py-4 text-sm text-nexora-gray-dark">
                    {supplier.taxId}
                  </td>
                  <td className="px-6 py-4 text-sm text-nexora-gray-dark">
                    {supplier.country}
                  </td>
                  <td className="px-6 py-4 text-sm text-nexora-gray-dark">
                    {StringFormatHelper.formatFriendlyDate(
                      new Date(supplier.lastUpdated)
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2 whitespace-nowrap">
                    <IconTooltipButton
                      label="View"
                      icon={
                        <EyeIcon className="w-5 h-5 text-nexora-accent hover:text-nexora-dark" />
                      }
                      onClick={() =>
                        navigate(`/app/details/${supplier.id}`, {
                          state: { from: location.pathname },
                        })
                      }
                    />
                    <IconTooltipButton
                      label="Edit"
                      icon={
                        <PencilSquareIcon className="w-5 h-5 text-nexora-accent hover:text-nexora-dark" />
                      }
                      onClick={() =>
                        navigate(`/app/edit/${supplier.id}`, {
                          state: { from: location.pathname },
                        })
                      }
                    />
                    <IconTooltipButton
                      label="Delete"
                      onClick={() => onDelete(supplier)}
                      icon={
                        <TrashIcon className="w-5 h-5 text-nexora-error hover:text-nexora-darkest" />
                      }
                    />
                    <IconTooltipButton
                      label="Screening"
                      onClick={() => onScreening(supplier)}
                      icon={
                        <MagnifyingGlassIcon className="w-5 h-5 text-nexora-info hover:text-nexora-dark" />
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SupplierDeleteModal
        isOpen={deleteOpen}
        onDelete={onRefresh}
        supplier={supplierSelected}
        onClose={() => setDeleteOpen(false)}
      />
      <ScreeningModal
        isOpen={screeningOpen}
        onClose={() => setScreeningOpen(false)}
        supplier={supplierSelected}
      />
    </>
  );
};

export { SupplierTable };

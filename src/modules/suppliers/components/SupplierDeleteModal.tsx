import { SimpleModal } from "@/shared/components/modals/SimpleModal";
import type { Supplier } from "@/shared/types/supplier";
import { useState } from "react";
import { supplierService } from "../services";

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onDelete: () => Promise<void>;
  readonly supplier: Supplier | null;
}

export const SupplierDeleteModal = ({
  isOpen,
  onClose,
  supplier,
  onDelete,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!supplier) return;

    setLoading(true);
    try {
      const res = await supplierService.delete(supplier.id!);
      if (!res) return;
      await onDelete();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleModal
      isOpen={isOpen}
      type="danger"
      loading={loading}
      onClose={onClose}
      onConfirm={handleDelete}
      text={`Are you sure you want to delete the provider "${supplier?.businessName}"? This action cannot be undone. Please proceed with caution.`}
    />
  );
};

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/shared/components/buttons/BackButton";
import FormButton from "@/shared/components/buttons/FormButton";
import FormInput from "@/shared/components/inputs/FormInput";
import FormSelect from "@/shared/components/selects/FormSelect";
import type { SupplierDetails } from "@/shared/types/supplier";
import type { Country } from "@/shared/types/countries/Country";
import { supplierService } from "../services";
import type { SupplierEditable } from "@/shared/types/supplier/SupplierEditable";
import { useState } from "react";

interface FormData {
  businessName: string;
  commercialName?: string;
  taxId: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  address?: string;
  countryId: number;
  annualRevenue?: number;
}

interface Props {
  readonly initialData?: SupplierDetails;
  readonly countries: Country[];
}

export const SupplierFormEditable = ({ initialData, countries }: Props) => {
  const isEditing = !!initialData;
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      businessName: initialData?.businessName,
      commercialName: initialData?.commercialName,
      taxId: initialData?.taxId,
      phoneNumber: initialData?.phoneNumber,
      email: initialData?.email,
      website: initialData?.website,
      address: initialData?.address,
      countryId: initialData?.country.id,
    },
  });

  const update = (data: SupplierEditable): Promise<SupplierDetails | null> => {
    const id = initialData!.id;
    return supplierService.update(id, data);
  };
  const create = (data: SupplierEditable): Promise<SupplierDetails | null> =>
    supplierService.create(data);

  const onSubmit = async (formData: FormData) => {
    try {
      const cleanString = (value?: string) =>
        value && value.trim() !== "" ? value : undefined;

      const data: SupplierEditable = {
        businessName: formData.businessName,
        countryId: Number(formData.countryId),
        taxId: formData.taxId,
        address: cleanString(formData.address),
        annualRevenue: formData.annualRevenue
          ? Number(formData.annualRevenue)
          : undefined,
        commercialName: cleanString(formData.commercialName),
        email: cleanString(formData.email),
        phoneNumber: cleanString(formData.phoneNumber),
        website: cleanString(formData.website),
      };

      setLoading(true);
      const callback = isEditing ? update : create;
      const response = await callback(data);
      if (!response) return;
      if (!isEditing) navigate(`/app/edit/${response.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <div className="flex justify-start mb-6">
          <BackButton />
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">
            Supplier Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Business Name"
            placeholder="Enter the business name"
            register={register("businessName", {
              required: "Business name is required",
              maxLength: {
                value: 200,
                message: "Business name cannot exceed 200 characters",
              },
            })}
            error={errors.businessName}
          />
          <FormInput
            label="Commercial Name"
            placeholder="Enter commercial name"
            register={register("commercialName", {
              maxLength: {
                value: 200,
                message: "Commercial name cannot exceed 200 characters",
              },
            })}
            error={errors.commercialName}
          />
          <FormInput
            label="Tax ID"
            placeholder="Enter tax ID (11 digits)"
            register={register("taxId", {
              required: "TaxId is required",
              pattern: {
                value: /^\d{11}$/,
                message: "TaxId must contain exactly 11 digits",
              },
            })}
            error={errors.taxId}
          />

          <FormInput
            label="Phone Number"
            placeholder="Enter phone number"
            register={register("phoneNumber")}
            error={errors.phoneNumber}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter email address"
            register={register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />

          <FormInput
            label="Website"
            placeholder="Enter website URL (https://...)"
            register={register("website", {
              pattern: {
                value: /^https:\/\/.+/,
                message: "Website must start with https://",
              },
            })}
            error={errors.website}
          />

          <FormInput
            label="Address"
            placeholder="Enter address"
            register={register("address", {
              maxLength: {
                value: 300,
                message: "Address cannot exceed 300 characters",
              },
            })}
            error={errors.address}
          />

          <FormSelect
            label="Country"
            register={register("countryId", {
              required: "Country is required",
              validate: (v) => !isNaN(Number(v)) || "Country must be selected",
            })}
            error={errors.countryId}
            options={countries.map((c) => ({ value: c.id, label: c.name }))}
          />

          <FormInput
            label="Annual Revenue"
            type="number"
            step={0.01}
            placeholder="Enter annual revenue"
            register={register("annualRevenue", {
              min: {
                value: 0,
                message: "Annual revenue must be a positive number",
              },
            })}
            error={errors.annualRevenue}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <FormButton
            variant="cancel"
            onClick={() => navigate("/app")}
            disabled={loading}
          >
            Cancel
          </FormButton>

          <FormButton variant="default" type="submit" loading={loading}>
            Save
          </FormButton>
        </div>
      </form>
    </div>
  );
};

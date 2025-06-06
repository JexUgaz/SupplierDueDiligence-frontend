import { KeyGenerator } from "@/shared/helpers";

const SupplierFormSkeleton = () => {
  const skeletonRows = KeyGenerator.generate(9);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="flex justify-start mb-6 space-x-4">
          <div className="w-24 h-10 bg-gray-200 rounded" />
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skeletonRows.map((s) => (
            <div key={s}>
              <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <div className="h-10 w-24 bg-gray-300 rounded" />
          <div className="h-10 w-24 bg-gray-400 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SupplierFormSkeleton;

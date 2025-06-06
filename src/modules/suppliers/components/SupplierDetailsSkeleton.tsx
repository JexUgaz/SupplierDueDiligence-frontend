import { KeyGenerator } from "@/shared/helpers";

const SkeletonBlock = ({ width = "w-full" }: { width?: string }) => (
  <div className={`h-4 rounded bg-gray-300 ${width}`}></div>
);

export const SupplierDetailsSkeleton = () => {
  const skeletonRows = KeyGenerator.generate(10);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-nexora-white rounded-2xl shadow-md font-sans text-nexora-text max-h-full min-h-[70%] relative animate-pulse">
      <div className="flex justify-start mb-6 space-x-4">
        <div className="w-6 h-6 bg-gray-300 rounded" />
        <div className="h-6 w-48 bg-gray-300 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {skeletonRows.map((key) => (
          <div key={key} className="space-y-2">
            <SkeletonBlock width="w-1/2" />
            <SkeletonBlock width="w-3/4" />
          </div>
        ))}

        <div className="sm:col-span-2 space-y-2">
          <SkeletonBlock width="w-1/3" />
          <SkeletonBlock width="w-full" />
        </div>
      </div>
    </div>
  );
};

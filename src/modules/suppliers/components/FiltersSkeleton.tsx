import { KeyGenerator } from "@/shared/helpers";

export const FiltersSkeleton = () => {
  const skeletonRows = KeyGenerator.generate(5);

  return (
    <div
      className="bg-gray-100 rounded-2xl p-3 mb-4
    grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"
    >
      {skeletonRows.map((s) => (
        <div
          key={s}
          className="h-10 rounded-md bg-gray-300 animate-pulse"
          style={{ minWidth: 150 }}
        />
      ))}
    </div>
  );
};

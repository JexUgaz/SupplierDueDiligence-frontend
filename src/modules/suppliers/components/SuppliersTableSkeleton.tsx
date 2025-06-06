import { KeyGenerator } from "@/shared/helpers";

export const SuppliersTableSkeleton = ({ rows = 5 }) => {
  const skeletonRows = KeyGenerator.generate(rows);

  return (
    <div className="overflow-x-auto md:overflow-hidden">
      <table className="w-full divide-y divide-gray-200 mt-10">
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
          {skeletonRows.map((key) => (
            <tr key={key} className="animate-pulse">
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
              <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                <div className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                <div className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                <div className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                <div className="inline-block w-5 h-5 bg-gray-300 rounded-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

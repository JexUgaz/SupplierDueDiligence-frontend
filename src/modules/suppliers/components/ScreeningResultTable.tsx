import type { ScreeningResponse } from "@/shared/types/screening/ScreeningResponse";

interface Props {
  readonly data: ScreeningResponse;
}

export const ScreeningResultTable = ({ data }: Props) => {
  const allResults = data.sources.flatMap((src) =>
    src.results.map((result) => ({
      ...result,
      source: src.name,
      sourceUrl: src.url,
    }))
  );

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2 text-nexora-darkest">
        Screening Summary
      </h3>

      <div className="text-sm text-nexora-darkest mb-4 space-y-1">
        <div>Total Sources: {data.sources.length}</div>
        <div>Total Hits: {data.totalHits}</div>
        <div>
          Sources:{" "}
          {data.sources.length > 0
            ? data.sources.map((s) => `${s.name} (${s.hits})`).join(", ")
            : "No sources found."}
        </div>
      </div>

      <h3 className="text-md font-semibold mb-2 text-nexora-darkest">
        Screening Results
      </h3>

      <div className="overflow-x-auto border border-nexora-gray-light rounded-lg">
        <table className="min-w-full text-sm text-left text-nexora-darkest">
          <thead className="bg-nexora-light text-xs uppercase text-nexora-darkest">
            <tr>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Sanction Program</th>
              <th className="px-4 py-2">Grounds</th>
              <th className="px-4 py-2">Sanction Imposed</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {allResults.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500 italic text-sm"
                >
                  No results found for this screening.
                </td>
              </tr>
            ) : (
              allResults.map((r, i) => (
                <tr key={i} className="border-t border-nexora-gray-light">
                  <td className="px-4 py-2 text-xs md:text-sm">
                    {" "}
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-nexora-primary hover:text-nexora-primary-dark"
                    >
                      {r.source}
                    </a>
                  </td>
                  <td className="px-4 py-2 font-medium text-xs md:text-sm">
                    {r.name}
                  </td>
                  <td className="px-4 py-2 text-xs md:text-sm">
                    {r.sanctionPrograms ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-xs md:text-sm">
                    {r.grounds ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-xs md:text-sm">
                    {r.sanctionImposed ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-xs md:text-sm">
                    {r.address ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-xs md:text-sm">
                    {r.date ?? "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

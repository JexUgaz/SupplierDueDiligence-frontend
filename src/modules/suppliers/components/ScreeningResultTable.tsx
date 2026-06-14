import type { ScreeningResponse } from "@/shared/types/screening/ScreeningResponse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText } from "lucide-react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { ExportButton } from "@/shared/components/buttons/ExportButton";

interface Props {
  readonly data: ScreeningResponse;
}

export const ScreeningResultTable = ({ data }: Props) => {
  const allResults = data.sources.flatMap((src) =>
    src.results.map((result) => ({
      ...result,
      source: src.name,
      sourceUrl: src.url,
    })),
  );

  const exportPdf = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Screening Report", 14, 15);

    pdf.setFontSize(11);
    pdf.text(`Total Sources: ${data.sources.length}`, 14, 25);
    pdf.text(`Total Hits: ${data.totalHits}`, 14, 32);

    autoTable(pdf, {
      startY: 40,
      head: [
        [
          "Source",
          "Name",
          "Sanction Program",
          "Grounds",
          "Sanction Imposed",
          "Address",
          "Date",
        ],
      ],
      body: allResults.map((r) => [
        r.source,
        r.name,
        r.sanctionPrograms ?? "-",
        r.grounds ?? "-",
        r.sanctionImposed ?? "-",
        r.address ?? "-",
        r.date ?? "-",
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fontStyle: "bold",
      },
    });

    pdf.save("screening-report.pdf");
  };

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Screening Report");

    worksheet.addRow(["Screening Report"]);
    worksheet.addRow([]);
    worksheet.addRow(["Total Sources", data.sources.length]);
    worksheet.addRow(["Total Hits", data.totalHits]);
    worksheet.addRow([]);

    const headerRow = worksheet.addRow([
      "Source",
      "Name",
      "Sanction Program",
      "Grounds",
      "Sanction Imposed",
      "Address",
      "Date",
    ]);

    headerRow.font = {
      bold: true,
    };

    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    allResults.forEach((r) => {
      const row = worksheet.addRow([
        r.source,
        r.name,
        r.sanctionPrograms ?? "-",
        r.grounds ?? "-",
        r.sanctionImposed ?? "-",
        r.address ?? "-",
        r.date ?? "-",
      ]);

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    worksheet.columns = [
      { width: 20 },
      { width: 30 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 35 },
      { width: 15 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buffer]), "screening-report.xlsx");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <div>
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
        </div>
        <div className="flex justify-center my-5 sm:my-0 sm:justify-end items-end sm:items-end gap-2">
          <ExportButton
            label="Export Excel"
            icon={FileSpreadsheet}
            onClick={exportExcel}
          />

          <ExportButton
            label="Export PDF"
            icon={FileText}
            onClick={exportPdf}
          />
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

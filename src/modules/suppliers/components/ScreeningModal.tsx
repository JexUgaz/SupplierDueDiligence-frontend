import type { Supplier } from "@/shared/types/supplier";
import { useCallback, useEffect, useState } from "react";
import FormButton from "@/shared/components/buttons/FormButton";
import { screeningService } from "@/modules/suppliers/services";
import type { Source } from "@/shared/types/screening/Source";
import type { ScreeningResponse } from "@/shared/types/screening/ScreeningResponse";
import { ScreeningResultTable } from "./ScreeningResultTable";

interface ScreeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
}

export const ScreeningModal = ({
  isOpen,
  onClose,
  supplier,
}: ScreeningModalProps) => {
  const [availableSources, setAvailableSources] = useState<Source[]>([]);
  const [selectedSources, setSelectedSources] = useState<Source[]>([]);
  const [loadingSources, setLoadingSources] = useState(true);
  const [loadingScreening, setLoadingScreening] = useState(false);
  const [screeningResponse, setScreeningResponse] =
    useState<ScreeningResponse | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      setLoadingSources(true);
      try {
        const sources = await screeningService.getSources();
        if (!sources) return;

        setAvailableSources(sources);
      } finally {
        setLoadingSources(false);
      }
    };

    if (isOpen) {
      setScreeningResponse(null);
      setSelectedSources([]);
      fetchSources();
    }
  }, [isOpen]);

  const toggleSource = (sourceCode: Source) => {
    if (selectedSources.includes(sourceCode)) {
      setSelectedSources(selectedSources.filter((s) => s.id !== sourceCode.id));
    } else if (selectedSources.length < 3) {
      setSelectedSources([...selectedSources, sourceCode]);
    }
  };

  const isSelected = (sourceCode: Source) =>
    selectedSources.some((s) => s.id === sourceCode.id);

  const onScreening = useCallback(async () => {
    try {
      setLoadingScreening(true);
      setScreeningResponse(null);
      const data = await screeningService.screening(
        supplier!.id!,
        selectedSources
      );
      if (!data) return;
      setScreeningResponse(data);
    } finally {
      setLoadingScreening(false);
    }
  }, [selectedSources, supplier]);

  if (!isOpen) return null;

  const isValid = selectedSources.length >= 1;
  const loading = loadingScreening || loadingSources;

  const hasScreeningData = screeningResponse != null;

  return (
    <dialog
      id="screening-modal"
      tabIndex={-1}
      className={`fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/50`}
      aria-modal="true"
    >
      <div
        className={`relative p-4 w-full max-h-full overflow-y-auto ${
          hasScreeningData ? "max-w-7xl" : "max-w-xl"
        }`}
      >
        <div className="relative rounded-lg shadow-lg bg-nexora-white text-nexora-text">
          {!loading && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-2.5 text-nexora-gray-medium hover:text-nexora-darkest rounded-lg text-sm w-8 h-8 flex justify-center items-center hover:bg-nexora-gray-light cursor-pointer"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}

          <div className="p-4 md:p-6 text-left space-y-4">
            <h2 className="text-lg font-semibold">Run screening for:</h2>
            <p className="text-sm text-nexora-darkest">
              <strong>Supplier:</strong> {supplier?.businessName}
            </p>
            {loadingSources ? (
              <div className="flex justify-center items-center py-8">
                <svg
                  className="animate-spin h-6 w-6 text-nexora-accent"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <>
                <label
                  htmlFor="sourceSelect"
                  className="block mb-2 text-sm font-medium"
                >
                  Select sources (1-3):
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSources.map((source) => {
                    const { enable } = source;
                    return (
                      <button
                        key={source.code}
                        type="button"
                        onClick={() => (enable ? toggleSource(source) : null)}
                        disabled={loading || !enable}
                        className={`px-3 py-1 rounded-full border text-sm ${
                          isSelected(source)
                            ? "bg-nexora-accent text-white border-nexora-accent hover:bg-nexora-accent-light"
                            : "bg-nexora-white text-nexora-darkest hover:bg-nexora-light border-nexora-gray-light"
                        } disabled:opacity-50 cursor-pointer disabled:cursor-default`}
                      >
                        {source.name}
                      </button>
                    );
                  })}
                </div>
                {selectedSources.length > 0 && (
                  <p className="mt-10 text-sm text-nexora-darkest">
                    <strong>Sources to be searched:</strong>{" "}
                    {selectedSources.map((s) => s.name).join(", ")}
                  </p>
                )}
              </>
            )}

            {screeningResponse && (
              <ScreeningResultTable data={screeningResponse} />
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loadingScreening}
                className="py-2 px-4 text-sm font-medium rounded-lg border border-nexora-gray-light bg-nexora-white text-nexora-darkest hover:bg-nexora-gray-light hover:text-nexora-accent cursor-pointer disabled:cursor-default"
              >
                Cancel
              </button>

              <FormButton
                type="button"
                loading={loadingScreening}
                disabled={!isValid}
                onClick={onScreening}
                className="inline-flex"
              >
                Run Screening
              </FormButton>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

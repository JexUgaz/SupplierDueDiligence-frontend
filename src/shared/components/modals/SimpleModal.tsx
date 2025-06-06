import { useEffect } from "react";
import FormButton from "../buttons/FormButton";

interface Props {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "default" | "danger";
}

export const SimpleModal = ({
  isOpen,
  onClose,
  loading = false,
  text,
  onConfirm,
  type = "default",
  cancelLabel = "No, cancel",
  confirmLabel = "Yes, I'm sure",
}: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return <></>;

  const isDanger = type === "danger";

  return (
    <dialog
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/50"
      aria-modal="true"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
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
              <span className="sr-only">Close modal</span>
            </button>
          )}

          <div className="p-4 md:p-5 text-center">
            <svg
              className={`mx-auto mb-4 w-12 h-12 ${
                isDanger ? "text-nexora-error" : "text-nexora-darkest"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-sm md:text-base font-medium">{text}</h3>
            <div className="flex justify-center">
              <FormButton
                type="button"
                loading={loading}
                onClick={onConfirm}
                className="inline-flex"
                variant={isDanger ? "danger" : "default"}
              >
                {confirmLabel}
              </FormButton>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="ml-3 py-2.5 px-5 text-sm font-medium rounded-lg border border-nexora-gray-light bg-nexora-white text-nexora-darkest hover:bg-nexora-gray-light hover:text-nexora-accent cursor-pointer disabled:cursor-default disabled:hover:bg-nexora-white disabled:hover:text-nexora-darkest"
              >
                {cancelLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

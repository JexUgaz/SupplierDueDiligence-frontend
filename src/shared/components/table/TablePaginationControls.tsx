import type { PaginationMetadata } from "@/shared/types/pagination";

interface Props {
  readonly loading: boolean;
  readonly metadata: PaginationMetadata;
  readonly onPrevious: (page: number) => void;
  readonly onNext: (page: number) => void;
}

const getPaginationRange = ({
  page,
  pageSize,
  totalItems,
}: Pick<PaginationMetadata, "page" | "pageSize" | "totalItems">) => {
  const start = pageSize * (page - 1) + 1;
  const end = Math.min(page * pageSize, totalItems);
  return { start, end };
};

export const TablePaginationControls = ({
  metadata,
  onPrevious,
  onNext,
  loading,
}: Props) => {
  if (loading) {
    return (
      <div className="flex justify-end items-center py-6 pe-3">
        <div className="w-6 h-6 border-4 border-nexora-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const {
    hasNextPage,
    hasPreviousPage,
    totalItems,
    page,
    pageSize,
    previousPage,
    nextPage,
  } = metadata;

  const { end, start } = getPaginationRange({ page, pageSize, totalItems });

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-700">
      <span>
        Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
        <strong>{totalItems}</strong>
      </span>
      <div className="space-x-2">
        <button
          disabled={!hasPreviousPage}
          onClick={() => (hasPreviousPage ? onPrevious(previousPage!) : null)}
          className="px-4 py-2 border border-nexora-gray-light rounded-md text-nexora-text bg-white hover:bg-nexora-light disabled:opacity-50 disabled:cursor-default cursor-pointer"
        >
          Previous
        </button>
        <button
          disabled={!hasNextPage}
          onClick={() => (hasNextPage ? onNext(nextPage!) : null)}
          className="px-4 py-2 border border-nexora-gray-light rounded-md text-nexora-text bg-white hover:bg-nexora-light disabled:opacity-50 disabled:cursor-default cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

import type { ScreeningResponse } from "@/shared/types/screening/ScreeningResponse";
import type { Source } from "@/shared/types/screening/Source";

export interface IScreeningService {
  /**
   * Gets the list of all sources.
   */
  getSources(): Promise<Source[] | null>;

  /**
   * Runs a screening process for a specific supplier using the selected sources.
   *
   * @param supplierId - The ID of the supplier to screen.
   * @param sources - The list of selected sources to be used in the screening.
   * @returns A promise that resolves to the screening response or null if the operation fails.
   */
  screening(
    supplierId: number,
    sources: Source[]
  ): Promise<ScreeningResponse | null>;
}

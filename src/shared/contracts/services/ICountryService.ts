import type { Country } from "@/shared/types/countries/Country";

export interface ICountryService {
  /**
   * Gets the list of all countries.
   */
  getAll(): Promise<Country[] | null>;
}

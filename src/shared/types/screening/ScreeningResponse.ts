interface ScrappingResult {
  name: string;
  address?: string | null;
  sanctionImposed?: string | null;
  date?: string | null;
  grounds?: string | null;
  sanctionPrograms?: string | null;
}

interface ScrappingSource {
  name: string;
  hits: number;
  url: string;
  results: ScrappingResult[];
}

export interface ScreeningResponse {
  query: string;
  totalHits: number;
  sources: ScrappingSource[];
}

import { SupplierDueDiligenceApi } from "@/shared/contracts/apis/SupplierDueDiligenceApi";
import type { IScreeningService } from "@/shared/contracts/services/IScreeningService";
import type { ScreeningResponse } from "@/shared/types/screening/ScreeningResponse";
import type { Source } from "@/shared/types/screening/Source";

export class ScreeningService
  extends SupplierDueDiligenceApi
  implements IScreeningService
{
  apiBase: string = "/screening";

  getSources(): Promise<Source[] | null> {
    return super.request<Source[]>({
      endpoint: "/sources",
    });
  }

  screening(
    supplierId: number,
    sources: Source[]
  ): Promise<ScreeningResponse | null> {
    const useAllSources = sources.length === 0;
    return super.request<ScreeningResponse>({
      endpoint: `/${supplierId}`,
      queryParams: {
        ...(useAllSources
          ? {}
          : { sources: sources.map((s) => s.code).join(",") }),
      },
    });
  }
}

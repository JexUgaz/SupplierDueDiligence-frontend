import { SupplierDueDiligenceApi } from "@/shared/contracts/apis/SupplierDueDiligenceApi";
import type { IAuthService } from "@/shared/contracts/services/IAuthService";
import type { User } from "@/shared/types/auth/User";

export class AuthService
  extends SupplierDueDiligenceApi
  implements IAuthService
{
  apiBase: string = "/auth";

  login(email: string, password: string): Promise<User | null> {
    return super.request<User>({
      endpoint: "/login",
      method: "POST",
      body: {
        email,
        password,
      },
    });
  }

  async logout(): Promise<boolean> {
    const result = await super.request<boolean>({
      endpoint: "/logout",
      method: "POST",
    });
    return result ?? false;
  }

  getUserByToken(): Promise<User | null> {
    return super.request<User>();
  }

  checkSession(): Promise<User | null> {
    return super.request<User>({ showErrorMessage: false });
  }
}

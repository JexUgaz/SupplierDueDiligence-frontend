import type { User } from "@/shared/types/auth/User";

export interface IAuthService {
  /**
   * Log in with email and password.
   * Returns an object with username and token.
   */
  login(email: string, password: string): Promise<User | null>;

  /**
   * Gets the user from a valid JWT token.
   */
  getUserByToken(): Promise<User | null>;
}

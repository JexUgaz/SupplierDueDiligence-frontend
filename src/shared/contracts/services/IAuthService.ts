import type { User } from "@/shared/types/auth/User";

export interface IAuthService {
  /**
   * Log in with email and password.
   * Returns an object with username and token.
   */
  login(email: string, password: string): Promise<User | null>;

  /**
   * Logs out the current user and clears the session.
   * Returns true if the logout was successful.
   */
  logout(): Promise<boolean>;
  /**
   * Gets the user from a valid JWT token.
   */
  getUserByToken(): Promise<User | null>;

  /**
   * Validates the current session and returns the authenticated user.
   * Returns null if the session is invalid or expired.
   */
  checkSession(): Promise<User | null>;
}

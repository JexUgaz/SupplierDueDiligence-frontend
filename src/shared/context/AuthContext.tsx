import { createContext } from "react";
import type { User } from "@/shared/types/auth/User";

export interface AuthContextProps {
  user: User | null;
  isAuthLoading: boolean;
  login: (data: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

import { useState, useEffect, type ReactNode, useMemo } from "react";
import {
  AuthContext,
  type AuthContextProps,
} from "@/shared/context/AuthContext";
import { authService } from "@/modules/auth/services";
import type { User } from "@/shared/types/auth/User";

interface Props {
  readonly children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await authService.getUserByToken();
        if (!data) return logout();
        setUser(data);
      } finally {
        setIsAuthLoading(false);
      }
    };
    getUser();
  }, []);

  const login = (data: User) => setUser(data);

  const logout = () => setUser(null);

  const value = useMemo<AuthContextProps>(
    () => ({ user, login, logout, isAuthLoading }),
    [user, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

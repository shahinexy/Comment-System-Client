/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.ts
import { createContext } from "react";

export interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  logoutUser: () => void;
  loading: boolean;
  token: string | null;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

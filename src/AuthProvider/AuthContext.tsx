/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.ts
import { createContext } from "react";

export interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

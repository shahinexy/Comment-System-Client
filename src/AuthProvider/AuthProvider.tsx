/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState<boolean>(true)


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("access-token");

    Promise.resolve().then(() => {
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
      setLoading(false);
    });
  }, [refetch]);

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser, loading, token, refetch, setRefetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthProvider.tsx
import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

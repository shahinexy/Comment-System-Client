import axiosPublic from "@/Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: IRegisterData) => {
      const res = await axiosPublic.post("/users", userData);
      return res.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginData: ILoginData) => {
      const res = await axiosPublic.post("/auth/login", loginData);
      return res.data;
    },
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface IPost {
  description: string;
  image?: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const usePostCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postData: any) => {
      const res = await axiosSecure.post("/posts", postData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const usePosts = () => {
  return useQuery<any, Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts");
      return res.data;
    },
  });
};

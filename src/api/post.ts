/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosPublic from "@/Hooks/useAxiosPublic";
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

export const usePosts = (filter?: string, userId?: string) => {
  return useQuery<any, Error>({
    queryKey: ["posts", filter, userId],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts", {
        params: { filter, userId },
      });
      return res.data;
    },
    enabled: !!userId,
  });
};

export const useUnauthenticatedUserPosts = (filter?: string) => {
  return useQuery<any, Error>({
    queryKey: ["posts", filter],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts/for-everyone", {
        params: { filter },
      });
      return res.data;
    },
  });
};

export const useSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const usePostComments = (
  postId: string,
  limit: number,
  page: number
) => {
  return useQuery({
    queryKey: ["postComments", postId, limit, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${postId}/comments`, {
        params: { limit, page },
      });

      return res.data;
    },
    enabled: !!postId,
  });
};

export const useCommentReplies = (commentId: string) => {
  return useQuery({
    queryKey: ["postComments", commentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/comments/${commentId}`);
      return res.data;
    },
  });
};

export const usePostReact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postData: any) => {
      const res = await axiosSecure.post(
        `/posts/${postData.id}`,
        postData.data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

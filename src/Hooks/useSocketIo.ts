/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TComment, TCommentReply } from "@/type/dataType";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const usePostSocket = (
  url: string,
  authToken: string,
  postId: string
) => {
  const socketRef = useRef<Socket | null>(null);
  const [commentReply, setCommentReply] = useState<TCommentReply | null>(null);
  const [comment, setComment] = useState<TComment | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;

    const socket = io(url, { transports: ["websocket"], autoConnect: false });
    socketRef.current = socket;

    socket.connect();

    socket.onAny((eventName, ...args) => {
      console.log("Event Received:", eventName, args);
    });

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected:", socket.id);

      socket.emit("authenticate", { token: authToken });
    });

    socket.on("authenticate", () => {
      console.log("Authenticated");
      socket.emit("joinPost", { postId });
    });

    socket.on("newComment", (payload: any) => {
      setComment(payload.comment);
    });

    socket.on("newCommentReply", (payload: any) => {
      setCommentReply(payload.comment);
    });

    return () => {
      socket.emit("leavePost", { postId });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url, authToken, postId]);

  const postComment = (content: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit("createComment", { postId, content });
  };

  const postCommentReply = (data: {content: string, commentId: string}) => {
    if (!socketRef.current) return;
    socketRef.current.emit("createCommentReply", data);
  };

  return {
    comment,
    setComment,
    postComment,
    postCommentReply,
    commentReply,
    setCommentReply,
    isConnected,
  };
};

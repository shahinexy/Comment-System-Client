/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const usePostSocket = (url: string, authToken: string, postId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [comments, setComments] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;

    const socket = io(url, { transports: ["websocket"], autoConnect: false });
    socketRef.current = socket;

    socket.connect();

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
      setComments(payload.comment);
    });

    return () => {
      socket.emit("leavePost", { postId });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url, authToken, postId]);

  const postComment = (content: string) => {
    if (!socketRef.current) return;
    // const tempComment = {
    //   id: `temp-${Date.now()}`,
    //   content,
    //   user: { fullName: "You", image: null },
    // };
    // setComments(prev => [...prev, tempComment]); 
    socketRef.current.emit("createComment", { postId, content });
  };

  return { comments, postComment, isConnected };
};

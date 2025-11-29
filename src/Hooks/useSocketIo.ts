/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocketAuth = (url: string, authToken: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (socketRef.current) return; 

    const s = io(url, {
      transports: ["websocket"],
      autoConnect: false,
    });

    s.onAny((event, ...args) => {
      console.log(`🔵 [SOCKET EVENT] ${event}`, args);
    });

    socketRef.current = s;
    s.connect();

    s.on("connect", () => {
      console.log("🟢 Socket connected:", s.id);
      s.emit("authenticate", { token: authToken });
    });

    s.on("authenticate", (data: any) => {
      console.log("✅ AUTH SUCCESS:", data);
      setIsAuthenticated(true);
    });

    s.on("socketError", (err: any) => {
      console.log("❌ AUTH ERROR:", err);
      setError(err.message);
      s.disconnect();
    });

    s.on("connect_error", (err) => {
      console.log("❌ CONNECT ERROR:", err.message);
    });

    return () => {
      console.log("🔴 Socket disconnected");
      s.disconnect();
      socketRef.current = null;
    };
  }, [url, authToken]);

  return { isAuthenticated, error };
};

export default useSocketAuth;

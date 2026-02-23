"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [status, setStatus] = useState<string>("disconnected");
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to socket.io backend
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8000";
    setStatus("connecting");
    const socket = io(wsUrl);
    socketRef.current = socket;

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.on("connect_error", () => setStatus("error"));
    socket.on("message", (data: string) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.connected && input.trim()) {
      socketRef.current.emit("message", input);
      setInput("");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">WebSocket Test</h1>
      <div className="mb-2">
        Status: <span className="font-mono">{status}</span>
      </div>
      <form
        className="flex gap-2 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          className="border rounded px-2 py-1 flex-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={status !== "connected"}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
          type="submit"
          disabled={status !== "connected" || !input.trim()}
        >
          Send
        </button>
      </form>
      <div className="mb-2">Messages:</div>
      <ul className="bg-gray-100 p-2 rounded min-h-[40px]">
        {messages.length === 0 ? (
          <li className="text-gray-400">No messages received</li>
        ) : (
          messages.map((msg, i) => <li key={i}>{msg}</li>)
        )}
      </ul>
    </main>
  );
}

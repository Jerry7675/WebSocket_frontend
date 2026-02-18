"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("disconnected");
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to local backend WebSocket server
    const ws = new window.WebSocket("ws://localhost:8000");
    wsRef.current = ws;
    setStatus("connecting");

    ws.onopen = () => setStatus("connected");
    ws.onclose = () => setStatus("disconnected");
    ws.onerror = () => setStatus("error");
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      input.trim()
    ) {
      wsRef.current.send(input);
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

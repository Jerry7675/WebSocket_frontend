"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message } from "@src/@types/message";
import { MessageList } from "@src/components/MessageList";
import { MessageInput } from "@src/components/MessageInput";
import { connectSocket, sendMessage } from "@src/@api/messaging";

const MOCK_USER_ID = "me";
const MOCK_USER_NAME = "You";

export default function MessagingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<string>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = connectSocket();
    wsRef.current = ws;
    setStatus("connecting");

    ws.onopen = () => setStatus("connected");
    ws.onclose = () => setStatus("disconnected");
    ws.onerror = () => setStatus("error");
    ws.onmessage = (event) => {
      try {
        const msg: Message = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch {
        // ignore invalid
      }
    };
    return () => ws.close();
  }, []);

  const handleSend = (content: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const msg: Message = {
        id: Math.random().toString(36).slice(2),
        senderId: MOCK_USER_ID,
        senderName: MOCK_USER_NAME,
        content,
        timestamp: Date.now(),
      };
      sendMessage(wsRef.current, msg);
      setMessages((prev) => [...prev, msg]);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <header className="p-4 border-b font-bold text-lg">Messages</header>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <MessageList messages={messages} currentUserId={MOCK_USER_ID} />
      </div>
      <MessageInput onSend={handleSend} disabled={status !== "connected"} />
    </div>
  );
}

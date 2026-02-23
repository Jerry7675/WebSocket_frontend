"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message } from "@src/@types/message";
import { MessageList } from "@src/components/MessageList";
import { MessageInput } from "@src/components/MessageInput";
import { connectSocket, sendMessage } from "@src/@api/messaging";
import { Socket } from "socket.io-client";

const MOCK_USER_ID = "me";
const MOCK_USER_NAME = "You";

export default function MessagingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<string>("disconnected");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;
    setStatus("connecting");

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.on("connect_error", () => setStatus("error"));
    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = (content: string) => {
    if (socketRef.current && socketRef.current.connected) {
      const msg: Message = {
        id: Math.random().toString(36).slice(2),
        senderId: MOCK_USER_ID,
        senderName: MOCK_USER_NAME,
        content,
        timestamp: Date.now(),
      };
      // Emit 'send_message' event to backend
      socketRef.current.emit("send_message", msg);
      setMessages((prev) => [...prev, msg]);
    }
  };

  return (
    <div className="relative flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 animate-gradient-x">
        <img
          src="/backgrounds/chat-1.jpg"
          alt="Chat background"
          className="object-cover w-full h-full opacity-80 blur-[2px] scale-105 transition-all duration-1000"
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
        {/* fallback gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f2f5] to-[#e4e6eb] opacity-90" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <header className="flex items-center gap-3 px-4 py-3 border-b bg-white/80 backdrop-blur shadow-sm sticky top-0 z-20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow animate-bounce-slow">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="12" fill="url(#a)" />
              <path
                d="M7 17l5-5 5 5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="0"
                  y1="0"
                  x2="24"
                  y2="24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1877F2" />
                  <stop offset="1" stopColor="#C13584" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-semibold text-xl text-gray-900 drop-shadow">
            Messenger
          </span>
          <span className="ml-auto text-xs px-2 py-1 rounded bg-gray-200 text-gray-600 font-medium shadow">
            {status}
          </span>
        </header>
        <main className="flex-1 overflow-y-auto px-0 sm:px-0 md:px-0 py-4 flex flex-col-reverse">
          <div className="flex-1 flex flex-col justify-end">
            <MessageList messages={messages} currentUserId={MOCK_USER_ID} />
          </div>
        </main>
        <footer className="bg-white/90 backdrop-blur shadow-lg p-2 border-t">
          <MessageInput onSend={handleSend} disabled={status !== "connected"} />
        </footer>
      </div>
    </div>
  );
}

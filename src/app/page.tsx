"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import NotificationIcon from "@src/components/NotificationIcon";

export default function Home() {
  // Placeholder: unreadCount should be replaced with real logic later
  const [unreadCount] = useState(5);
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden bg-gradient-to-br from-[#f0f2f5] to-[#e4e6eb]">
      {/* Notification Icon - top right */}
      <div className="fixed top-6 right-8 z-50">
        <NotificationIcon unreadCount={unreadCount} />
      </div>
      {/* Animated background image */}
      <div className="absolute inset-0 z-0 animate-gradient-x">
        <img
          src="/backgrounds/chat-1.jpg"
          alt="Background"
          className="object-cover w-full h-full opacity-80 blur-[2px] scale-105 transition-all duration-1000"
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f2f5] to-[#e4e6eb] opacity-90" />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-4xl shadow animate-avatar-pop">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-lg tracking-tight animate-bubble-pop">
              NextGen Messenger
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6 animate-message-in">
            Experience real-time communication with blazing fast WebSockets,
            beautiful UI, and enterprise-grade reliability.{" "}
            <span className="font-semibold text-blue-600">
              Chat. Connect. Collaborate.
            </span>
          </p>
          <a
            href="/messages"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform animate-send-btn"
          >
            Message Now
          </a>
        </section>

        {/* Features Section */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-blue-400 animate-bubble-pop">
            <img
              src="/avatars/messages.png"
              alt="Instant"
              className="w-16 h-16 mb-4 rounded-full shadow animate-avatar-pop"
            />
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Instant Messaging
            </h2>
            <p className="text-gray-600">
              Send and receive messages in real time with zero delay, powered by
              modern WebSocket technology.
            </p>
          </div>
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-purple-400 animate-bubble-pop">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              className="mb-4"
            >
              <circle cx="12" cy="12" r="10" fill="#e4e6eb" />
              <path
                d="M8 12l2 2 4-4"
                stroke="#7c3aed"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Reliable Delivery
            </h2>
            <p className="text-gray-600">
              Never miss a message. Our robust backend ensures your chats are
              always delivered and received.
            </p>
          </div>
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-pink-400 animate-bubble-pop">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              className="mb-4"
            >
              <rect x="4" y="4" width="16" height="16" rx="8" fill="#f0f2f5" />
              <path
                d="M8 12h8M12 8v8"
                stroke="#ec4899"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Modern Design
            </h2>
            <p className="text-gray-600">
              Enjoy a beautiful, responsive interface with smooth animations and
              delightful details everywhere.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full text-center text-gray-500 text-sm mt-8 animate-message-in">
          &copy; {new Date().getFullYear()} NextGen Messenger &mdash; Crafted
          with <span className="text-pink-500">♥</span> for modern teams.
        </footer>
      </div>
    </main>
  );
}

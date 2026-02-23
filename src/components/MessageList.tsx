import { Message } from "@/src/@types/message";
import React from "react";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => (
  <ul className="flex flex-col gap-3 px-3 py-2 overflow-y-auto">
    {messages.map((msg, idx) => {
      const isMe = msg.senderId === currentUserId;
      // Use a random avatar for demo, fallback to initial
      const avatarUrl = `/avatars/${isMe ? "me" : "user"}${(idx % 5) + 1}.png`;
      return (
        <li
          key={msg.id}
          className={
            "flex items-end gap-2 " + (isMe ? "justify-end" : "justify-start")
          }
        >
          {!isMe && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-base select-none shadow-lg animate-avatar-pop overflow-hidden">
              <img
                src={avatarUrl}
                alt={msg.senderName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute left-0 right-0 text-center w-full">
                {msg.senderName?.[0] || "?"}
              </span>
            </div>
          )}
          <div
            className={
              "relative max-w-[70vw] md:max-w-[400px] px-4 py-2 rounded-2xl shadow-lg transition-all duration-300 animate-message-in " +
              (isMe
                ? "bg-gradient-to-tr from-blue-500 to-purple-500 text-white rounded-br-md animate-bubble-pop"
                : "bg-white text-gray-900 rounded-bl-md border animate-bubble-pop")
            }
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div
              className={
                "text-xs font-medium mb-1 " +
                (isMe ? "text-white/70" : "text-gray-500/80")
              }
            >
              {msg.senderName}
            </div>
            <div className="break-words whitespace-pre-line text-base">
              {msg.content}
            </div>
            <div
              className={
                "text-[10px] opacity-60 mt-1 text-right " +
                (isMe ? "text-white/70" : "text-gray-500/80")
              }
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {isMe && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base select-none shadow-lg animate-avatar-pop overflow-hidden">
              <img
                src={avatarUrl}
                alt={msg.senderName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute left-0 right-0 text-center w-full">
                {msg.senderName?.[0] || "?"}
              </span>
            </div>
          )}
        </li>
      );
    })}
  </ul>
);

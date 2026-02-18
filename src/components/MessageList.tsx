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
  <ul className="flex flex-col gap-2 p-2 overflow-y-auto">
    {messages.map((msg) => (
      <li
        key={msg.id}
        className={
          "max-w-[70%] px-4 py-2 rounded-lg " +
          (msg.senderId === currentUserId
            ? "self-end bg-blue-500 text-white"
            : "self-start bg-gray-200 text-gray-900")
        }
      >
        <div className="text-xs opacity-70 mb-1">{msg.senderName}</div>
        <div>{msg.content}</div>
        <div className="text-[10px] opacity-50 mt-1 text-right">
          {new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </li>
    ))}
  </ul>
);

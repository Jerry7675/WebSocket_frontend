import React, { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled,
}) => {
  const [value, setValue] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <form className="flex gap-2 items-center p-2" onSubmit={handleSend}>
      <input
        className="flex-1 border-none rounded-full px-4 py-2 shadow-sm bg-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-300/60 text-base transition-all duration-200"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message..."
        disabled={disabled}
        autoComplete="off"
      />
      <button
        className="flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed animate-send-btn"
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path d="M3 20l18-8-18-8v7l13 1-13 1v7z" fill="currentColor" />
        </svg>
      </button>
    </form>
  );
};

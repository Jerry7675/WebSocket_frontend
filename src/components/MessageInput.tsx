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
    <form className="flex gap-2 p-2 border-t" onSubmit={handleSend}>
      <input
        className="flex-1 border rounded px-3 py-2"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message..."
        disabled={disabled}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        type="submit"
        disabled={disabled || !value.trim()}
      >
        Send
      </button>
    </form>
  );
};

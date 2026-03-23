"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MessageType = "info" | "success" | "error";

type Message = { id: number; text: string; type: MessageType };

interface MessageContextType {
  push: (text: string, type?: MessageType) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const push = (text: string, type: MessageType = "info") => {
    const id = Date.now();
    setMessages((m) => [...m, { id, text, type }]);

    // auto-remove after 4s
    setTimeout(
      () => setMessages((m) => m.filter((msg) => msg.id !== id)),
      4000
    );
  };

  return (
    <MessageContext.Provider value={{ push }}>
      {children}
      {/* container for toast messages */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`px-4 py-2 rounded shadow-md text-sm whitespace-nowrap transition-opacity duration-300
              ${m.type === "error" ? "bg-red-500 text-white" : "bg-gray-800 text-white"}`}
          >
            {m.text}
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return ctx.push;
}

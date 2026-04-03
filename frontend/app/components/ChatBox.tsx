"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Messages from "./Message";
import InputArea from "./InputBox";
import { chatApi } from "../../lib/api";
import { generateId } from "./utils";

export default function ChatBox() {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("normal");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ai-chats");
    if (saved) {
      const parsed = JSON.parse(saved);
      setChats(parsed);
      if (parsed.length > 0) setActiveChat(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ai-chats", JSON.stringify(chats));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const currentChat = chats.find((c) => c.id === activeChat);

  const newChat = () => {
    const chat = { id: generateId(), title: "New Chat", messages: [] };
    setChats([chat, ...chats]);
    setActiveChat(chat.id);
  };

  const deleteChat = (id: string) => {
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);
    if (activeChat === id) setActiveChat(updated.length ? updated[0].id : null);
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeChat) return;

    const messageText = input;

    const userMsg = { id: generateId(), role: "user", text: messageText };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? {
            ...c,
            messages: [...c.messages, userMsg],
            title: c.messages.length === 0 ? messageText.slice(0, 25) : c.title,
          }
          : c
      )
    );

    setInput(""); 
    setLoading(true);

    try {
      const res = await chatApi(messageText, mode); 

      const botMsg = { id: generateId(), role: "bot", text: res.reply };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat
            ? { ...c, messages: [...c.messages, botMsg] }
            : c
        )
      );
    } catch {
      const errorMsg = { id: generateId(), role: "bot", text: "Error 😢" };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat
            ? { ...c, messages: [...c.messages, errorMsg] }
            : c
        )
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white overflow-hidden">

      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        deleteChat={deleteChat}
        newChat={newChat}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1 min-w-0">

        <Header
          currentChat={currentChat}
          mode={mode}
          setMode={setMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4 space-y-2 min-w-0 scrollbar-hide">
          <Messages
            currentChat={currentChat}
            loading={loading}
            messagesEndRef={messagesEndRef}
          />
        </div>

        {currentChat && (
            <InputArea
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
        )}

      </div>
    </div>
  );
}
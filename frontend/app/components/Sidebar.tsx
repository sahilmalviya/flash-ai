import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ chats, activeChat, setActiveChat, deleteChat, newChat, sidebarOpen, setSidebarOpen }: any) {
  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-30" onClick={() => setSidebarOpen(false)} />}

      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed lg:static lg:translate-x-0 left-0 top-0 h-screen w-64 bg-[#020617] border-r border-gray-800 flex flex-col shadow-lg transition-transform duration-300 z-40`}>

        <div className="flex items-center justify-center py-4 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/flash-favicon.png"
              alt="FlashAI Logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold text-purple-400">
              FlashAI
            </h1>
          </Link>
        </div>

        <button onClick={newChat} className="m-3 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 py-2 rounded-lg hover:opacity-90 cursor-pointer">
          <Plus size={16} /> New Chat
        </button>

        <div className="flex-1 overflow-y-auto px-2">
          {chats.map((chat: any) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChat(chat.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer mb-1 ${activeChat === chat.id ? "bg-purple-600/40" : "hover:bg-gray-800"}`}
            >
              <span className="truncate text-sm">{chat.title}</span>
              <button onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }} className="opacity-0 group-hover:opacity-100 text-red-400 cursor-pointer">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t border-gray-800 p-3 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FlashAI. All rights reserved.
        </div>
      </aside>
    </>
  );
}
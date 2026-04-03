import { Menu, X } from "lucide-react";

export default function Header({ currentChat, mode, setMode, sidebarOpen, setSidebarOpen }: any) {
  return (
    <div className="px-4 py-4 border-b border-gray-800 bg-[#0b1220]">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="font-semibold text-lg">{currentChat ? currentChat.title : "Select Chat"}</h1>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["normal", "angry", "funny", "sad"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-lg text-xs capitalize cursor-pointer ${
              mode === m
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
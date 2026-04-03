import { useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function InputArea({ input, setInput, sendMessage }: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 100;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [input]);

  return (
    <div className="border-t border-gray-800 p-4 bg-[#020617]">
      <div className="relative flex items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full bg-[#1e293b] px-4 py-3 pr-12 rounded-lg outline-none text-sm focus:ring-2 focus:ring-purple-600 resize-none overflow-y-auto scrollbar-hide"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 flex items-center justify-center cursor-pointer"
          
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
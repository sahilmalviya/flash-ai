import { MessageCircle, Bot, UserRound } from "lucide-react";
import { getBotGreeting } from "./utils";
import MarkdownRenderer from "./MarkdownRenderer";

export default function Messages({ currentChat, loading, renderSmart, messagesEndRef }: any) {
  const showDefaultGreeting = currentChat && currentChat.messages.length === 0;

  return (
    <div className="flex-1 overflow-y-auto px-1 py-6 space-y-4 scrollbar-hide">
      {!currentChat ? (
        <div className="min-h-[calc(75vh-3.25rem)] flex items-center justify-center">
          <div className="text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-purple-400/50" />
            <h3 className="text-xl font-semibold mb-2">Welcome to <span className="text-purple-400"> FlashAI </span></h3>
            <p className="text-purple-300/60">Select a chat or create a new one to start</p>
          </div>
        </div>
      ) : showDefaultGreeting ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-center text-gray-200 text-lg">{getBotGreeting()}</p>
        </div>
      ) : (
        currentChat.messages.map((m: any) => (
          <div
            key={m.id}
            className={`flex w-full mb-2 min-w-0 ${m.role === "user"
              ? "justify-end items-end gap-2"
              : "justify-start items-start gap-2"
              }`}
          >
            {m.role === "bot" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600/20">
                <Bot size={16} className="text-purple-400" />
              </div>
            )}

            <div className={`px-3 py-2 text-sm rounded-xl
                  ${m.role === "user"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none"
                : " text-gray-100 rounded-bl-none"
              }
                 max-w-[100%] sm:max-w-[80%] md:max-w-[60%]
                break-words whitespace-pre-wrap overflow-wrap-anywhere
                `}
            >
              <MarkdownRenderer text={m.text} />
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600/20">
                <UserRound size={16} className="text-indigo-400" />
              </div>
            )}
          </div>
        ))
      )}

      {loading && <p className="text-gray-400 text-sm">Typing...</p>}
      <div ref={messagesEndRef} />
    </div>
  );
}
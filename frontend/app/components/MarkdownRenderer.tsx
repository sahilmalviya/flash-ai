"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Copy } from "lucide-react";
import { useState } from "react";
import remarkBreaks from "remark-breaks";

import { formatAIResponse, getTextFromChildren } from "./utils";

function CodeBlock({ inline, className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const codeText = getTextFromChildren(children).replace(/\n$/, "");

  if (inline) {
    return (
      <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
        {children}
      </code>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-xs px-1 py-1 rounded flex items-center gap-1"      >
        <Copy size={14} />
        {copied ? "Copied" : "Copy"}
      </button>

      <pre className="bg-black p-4 rounded-lg overflow-x-auto text-sm max-w-full">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ text }: { text: string }) {
  const formatted = formatAIResponse(text);

  return (
    <div className="prose prose-invert max-w-full break-words whitespace-pre-wrap overflow-wrap-anywhere">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkBreaks]}
        components={{
          code: CodeBlock,

          p: ({ children }) => <span>{children}</span>,
        }}
      >
        {formatted}
      </ReactMarkdown>
    </div>
  );
}
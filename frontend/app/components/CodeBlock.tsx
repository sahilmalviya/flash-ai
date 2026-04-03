"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export function CodeBlock({ inline, className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const getText = (children: any): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(getText).join("");
    if (children?.props?.children) return getText(children.props.children);
    return "";
  };

  const codeText = getText(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (inline) {
    return <code className="bg-gray-800 px-1 py-0.5 rounded">{children}</code>;
  }

  return (
    <div className="relative my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
      >
        <Copy size={14} />
        {copied ? "Copied" : "Copy"}
      </button>

      <pre className="bg-black p-4 rounded-lg overflow-x-auto text-sm">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}
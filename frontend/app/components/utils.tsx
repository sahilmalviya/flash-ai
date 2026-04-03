export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function escapeHtml(html: string) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function getTextFromChildren(children: any): string {
  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }

  if (typeof children === "object" && children !== null) {
    return getTextFromChildren(children.props?.children);
  }

  return "";
}

export function formatAIResponse(text: string) {
  const htmlMatch = text.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);

  if (htmlMatch) {
    const before = text.split(htmlMatch[0])[0];
    const after = text.split(htmlMatch[0])[1];

    const escapedHtml = escapeHtml(htmlMatch[0]);

    return (
      before.trim() +
      "\n\n```html\n" +
      escapedHtml +
      "\n```\n\n" +
      after.trim()
    );
  }

  return text;
}

export function getBotGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning! How can I assist?";
  if (hour < 18) return "Good afternoon! What are you working on?";
  return "Good evening! How can I help?";
}
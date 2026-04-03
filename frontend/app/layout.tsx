import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FlashAI - Your Personal AI Assistant",
    template: "%s | FlashAI",
  },
  description: "FlashAI is an AI-powered assistant that helps automate your workflow, boost productivity, and simplify tasks.",
  
  keywords: [
    "AI assistant",
    "productivity tools",
    "automation",
    "FlashAI",
    "AI tools"
  ],

  authors: [{ name: "FlashAI Team" }],

  metadataBase: new URL("https://yourdomain.com"), 

  openGraph: {
    title: "FlashAI - Your Personal AI Assistant",
    description: "Boost your productivity with AI-powered automation.",
    url: "https://yourdomain.com",
    siteName: "FlashAI",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "FlashAI",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FlashAI - AI Assistant",
    description: "AI-powered workflow automation tool",
    images: ["/meta.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/meta.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
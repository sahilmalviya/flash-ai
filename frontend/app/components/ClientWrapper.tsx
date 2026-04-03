"use client";

import { useEffect, useState } from "react";

function SplashScreen() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-purple-400 animate-pulse">
          FlashAI
        </h1>
        {/* <p className="text-gray-400 mt-2">Loading your experience...</p> */}
      </div>
    </div>
  );
}

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return <>{children}</>;
}
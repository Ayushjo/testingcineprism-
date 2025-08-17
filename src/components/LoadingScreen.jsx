"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-8xl font-mono text-emerald-400 mb-4">{count}</div>
        <div className="text-xl text-slate-300">
          Loading cinematic experience...
        </div>
        <div className="mt-8 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-200"
            style={{ width: `${(10 - count) * 10}%` }}
          />
        </div>
      </div>
    </div>
  );
}

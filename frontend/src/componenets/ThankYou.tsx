"use client";

import { useEffect, useState } from "react";

interface ThankYouProps {
  onSubmitAnother: () => void;
}

export default function ThankYou({ onSubmitAnother }: ThankYouProps) {
  const [showCheck, setShowCheck] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 100);
    const t2 = setTimeout(() => setShowText(true), 500);
    const t3 = setTimeout(() => setShowLink(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 min-h-[260px]">
      {/* Animated check circle */}
      <div
        className={`transition-all duration-700 ease-out ${
          showCheck
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-50 translate-y-4"
        }`}
      >
        <div className="relative w-16 h-16 mb-6">
          {/* Pulse ring */}
          <span
            className={`absolute inset-0 rounded-full bg-blue-100 ${
              showCheck ? "animate-ping-once" : ""
            }`}
            style={{
              animation: showCheck
                ? "ping-once 0.8s cubic-bezier(0,0,0.2,1) forwards"
                : "none",
            }}
          />
          {/* Circle */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200">
            {/* Checkmark SVG with draw animation */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-7 h-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#3b82f6"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="63"
                strokeDashoffset={showCheck ? "0" : "63"}
                style={{
                  transition: "stroke-dashoffset 0.5s ease-out 0.1s",
                }}
              />
              <polyline
                points="7,12.5 10.5,16 17,9"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="14"
                strokeDashoffset={showCheck ? "0" : "14"}
                style={{
                  transition: "stroke-dashoffset 0.35s ease-out 0.55s",
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Thanks text */}
      <div
        className={`text-center transition-all duration-500 ease-out ${
          showText
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Thanks!</h2>
        <p className="text-sm text-gray-500">Your suggestion has been submitted.</p>
      </div>

      {/* Submit another link */}
      <div
        className={`mt-5 transition-all duration-500 ease-out ${
          showLink
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        <button
          onClick={onSubmitAnother}
          className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
        >
          Submit another one
        </button>
      </div>

      <style jsx>{`
        @keyframes ping-once {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

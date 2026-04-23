"use client";

export default function SuggestBanner() {
  return (
    <div className="relative bg-[#F5F5F0] rounded-2xl px-8 py-12 mt-12 overflow-hidden">
      {/* Decorative background arc */}
      <div className="absolute right-0 top-0 bottom-0 w-64 h-full pointer-events-none select-none">
        <svg
          viewBox="0 0 260 120"
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20"
          width="260"
          height="220"
          fill="none"
        >
          <circle cx="180" cy="60" r="80" stroke="#B0B0A8" strokeWidth="28" />
          <circle cx="240" cy="60" r="50" stroke="#B0B0A8" strokeWidth="18" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-sm">
        <h2 className="text-[18px] font-bold text-gray-900 mb-2">
          Can't find what you're looking for?
        </h2>
        <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
          Suggest a new category for our editorial team to cover. We are
          constantly expanding our horizons to match your curiosity.
        </p>
        <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold rounded-lg transition-colors duration-150 shadow-sm">
          Suggest a Topic
        </button>
      </div>
    </div>
  );
}

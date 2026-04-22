"use client";

import { useState } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
const topics = [
  "#Artificial Intelligence",
  "#React Architecture",
  "#Productivity",
  "#Ethical Design",
  "#Web3",
  "#Neuroscience",
  "#Minimalism",
  "#Remote Work",
  "#Venture Capital",
  "#Philosophy",
];

export default function WeeklyDigest() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submission
  };

  return (
    <div className="  flex items-center justify-center  ">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full ">
        {/* Left Card */}
        <div className="relative bg-[#005EA3] rounded-3xl p-8 w-full md:w-[55%] overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute top-[-40px] right-[-40px] w-52 h-52 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute top-8 right-4 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

          <h1 className="text-white md:text-3xl text-xl font-bold leading-tight mb-3">
            The Weekly Digest
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed mb-8">
            Get the most thought-provoking essays and insights delivered
            straight to your inbox every Sunday morning.
          </p>

          <form onSubmit={handleSubmit} className="flex md:flex-row flex-col gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white/20 text-white placeholder-blue-200 text-sm rounded-xl px-4 py-3 outline-none focus:bg-white/30 transition"
            />
            <button
              type="submit"
              className="bg-white text-[#2563EB] font-semibold text-sm px-5 py-3 rounded-xl hover:bg-blue-50 transition whitespace-nowrap"
            >
              Join Now
            </button>
          </form>

          <p className="text-blue-200 text-xs">
            Zero spam. Pure curation. Unsubscribe at any time.
          </p>
        </div>

        {/* Right: Explore Topics */}
        <div className="w-full md:flex-1">
          <div className="flex items-center gap-2 mb-5">
            {/* Tag icon */}
            <LocalOfferOutlinedIcon className="text-[#005EA3]" />
            <span className="text-gray-800 font-semibold text-base">
              Explore Topics
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                className="bg-white cursor-pointer text-gray-700 text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

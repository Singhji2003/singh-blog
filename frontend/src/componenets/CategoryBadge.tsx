import React from "react";

const categoryColors: Record<string, string> = {
  AI: "bg-[#4B6BFB] text-white",
  Culture: "bg-[#4B6BFB] text-white",
  Finance: "bg-[#4B6BFB] text-white",
  Lifestyle: "bg-[#4B6BFB] text-white",
  Rubrics: "bg-[#4B6BFB] text-white",
};

interface CategoryBadgeProps {
  category: string;
  small?: boolean;
}

export default function CategoryBadge({ category, small }: CategoryBadgeProps) {
  const color = categoryColors[category] ?? "bg-[#4B6BFB] text-white";
  return (
    <span
      className={`inline-block rounded-sm font-semibold uppercase tracking-wide ${color} ${
        small ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5"
      }`}
    >
      {category}
    </span>
  );
}

"use client";

import { iconMap } from "./CategoryIcons";
import type { Category } from "@/app/api/categories/route";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: category.iconBg }}
      >
        {IconComponent && (
          <IconComponent color={category.iconColor} size={20} />
        )}
      </div>

      {/* Name */}
      <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">
        {category.name}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
        {category.description}
      </p>

      {/* Article Count Badge */}
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-gray-100 text-gray-500">
        {category.articleCount} Articles
      </span>
    </div>
  );
}

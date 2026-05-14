import React from "react";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";
import { Blog } from "@/types/blog";

interface FeaturedBlogCardProps {
  blog: Blog;
}

export default function FeaturedBlogCard({ blog }: FeaturedBlogCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-sm mb-6">
      {/* Image */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${blog.imageId}/800/600`}
          alt={blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-center">
        <div className="mb-3">
          <CategoryBadge category={blog.category} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
          {blog.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {blog.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <Image
              src={`https://picsum.photos/seed/${blog.imageId + 10}/50/50`}
              alt="Author"
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
          <span className="text-gray-500 font-medium text-xs">Editorial Team</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
      </div>
    </div>
  );
}

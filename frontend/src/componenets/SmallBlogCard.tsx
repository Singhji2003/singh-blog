import React from "react";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";
import { Blog } from "@/types/blog";

interface SmallBlogCardProps {
  blog: Blog;
}

export default function SmallBlogCard({ blog }: SmallBlogCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={blog.category} small />
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#4B6BFB] transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-3">
          {blog.excerpt}
        </p>
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <Image
              src={`https://picsum.photos/seed/${blog.imageId + 5}/40/40`}
              alt="Author"
              width={20}
              height={20}
              className="object-cover"
            />
          </div>
          <span className="text-gray-500 font-medium">Editorial</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
      </div>
    </div>
  );
}

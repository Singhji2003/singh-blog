"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Blog } from "@/types/blog";
import { FeaturedSkeleton, SmallSkeleton } from "@/componenets/Skeletons";
import FeaturedBlogCard from "@/componenets/FeaturedBlogCard";
import SmallBlogCard from "@/componenets/SmallBlogCard";
import Pagination from "@/componenets/Pagination";
import serverUrl from "@/utils/serverUrl";

const CATEGORIES = ["All", "Finance", "Press", "AI", "Lifestyle", "Rubrics"];
const TOTAL_PAGES = 4;

export default function ExploreBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const fetchBlogs = useCallback(async (category: string, page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${serverUrl}api/v1/blogs?category=${encodeURIComponent(category)}&page=${page}`,
      );
      const data = await res.json();
      console.log(data);
      setBlogs(data.data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(activeCategory, currentPage);
  }, [activeCategory, currentPage, fetchBlogs]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter & sort
  const filteredBlogs = blogs.filter((b) =>
    searchQuery
      ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  );

  const sortedBlogs =
    sortOrder === "oldest" ? [...filteredBlogs].reverse() : filteredBlogs;

  const featuredBlog = sortedBlogs.find((b) => b.featured) || sortedBlogs[0];
  const gridBlogs = sortedBlogs.filter((b) => b.id !== featuredBlog?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-12   py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-gray-900 tracking-tight mb-2">
            Explore Blogs
          </h1>
          <p className="text-gray-400 text-sm">
            Discover insights and stories from across our editorial landscape.
          </p>
        </div>

        {/* Toolbar: categories + search + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          {/* Categories */}
          <div className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#4B6BFB] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right: search + sort */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search on..."
                className="pl-8 pr-3 py-1.5 rounded border border-gray-200 bg-white text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4B6BFB] w-36 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Sort by:</span>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "latest" | "oldest")
                }
                className="border border-gray-200 bg-white rounded px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-[#4B6BFB] font-medium"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured blog */}
        {loading ? (
          <FeaturedSkeleton />
        ) : featuredBlog ? (
          <FeaturedBlogCard blog={featuredBlog} />
        ) : null}

        {/* Grid blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-2">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SmallSkeleton key={i} />)
            : gridBlogs
                .slice(0, 3)
                .map((blog) => <SmallBlogCard key={blog.id} blog={blog} />)}
        </div>

        {/* Bottom row: 1 wide card */}
        {!loading && gridBlogs.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            <SmallBlogCard blog={gridBlogs[3]} />
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

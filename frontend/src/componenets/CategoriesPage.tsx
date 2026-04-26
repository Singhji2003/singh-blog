"use client";

import { useState, useEffect, useCallback } from "react";
import CategoryCard from "./CategoryCard2";
import SuggestBanner from "./SuggestBanner";
import axios from "axios";
import serverUrl from "@/utils/serverUrl";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const SORT_OPTIONS = [
  { value: "most-popular", label: "Most Popular" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "least-articles", label: "Least Articles" },
];

export default function CategoriesPage() {
  interface Category {
    id: string;
    title: string;
    description: string;
    articleCount: number;
    icon: string;
    iconBg: string;
    iconColor: string;
    popular?: boolean;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("most-popular");
  const [loading, setLoading] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverUrl}api/v1/category?hint=${search}`,
      );
      console.log(response)
      setCategories(response?.data?.data);
      setTotal(response?.data?.data?.length);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const selectedSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Most Popular";

  return (
    <div className="min-h-screen  ">
      <div className=" mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-gray-900 tracking-tight mb-2">
            Explore Categories
          </h1>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-xs">
            Browse articles based on topics that interest you. From cutting-edge
            tech to personal motivation
          </p>
        </div>

        {/* Search + Sort row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between   mb-6 gap-4">
          {/* Left side (Search + Sort) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <SearchIcon />
              </span>

              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Sort dropdown */}
            {/* <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center justify-between w-full sm:w-[160px] gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              >
                <span className="truncate">{selectedSortLabel}</span>
                <ChevronIcon />
              </button>

              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50 transition-colors ${
                        sort === option.value
                          ? "text-blue-600 font-semibold bg-blue-50"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div> */}
          </div>

          {/* Total count */}
          <div className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 text-left lg:text-right">
            {total} Categories Available
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {sortOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setSortOpen(false)}
          />
        )}

        {/* Category Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-100 mb-4" />
                <div className="h-4 bg-gray-100 rounded mb-2 w-2/3" />
                <div className="h-3 bg-gray-100 rounded mb-1 w-full" />
                <div className="h-3 bg-gray-100 rounded mb-4 w-4/5" />
                <div className="h-5 bg-gray-100 rounded-full w-24" />
              </div>
            ))}
          </div>
        ) : categories?.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-[15px]">No categories found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Suggest Banner */}
        <SuggestBanner />
      </div>
    </div>
  );
}

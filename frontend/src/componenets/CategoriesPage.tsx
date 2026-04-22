"use client";

import { useState, useEffect, useCallback } from "react";
import CategoryCard from "./CategoryCard2";
import SuggestBanner from "./SuggestBanner";

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
    name: string;
    description: string;
    articleCount: number;
    icon: string;
    iconBg: string;
    iconColor: string;
    popular?: boolean;
  }

  const dummyCategories: Category[] = [
    {
      id: "technology",
      name: "Technology",
      description:
        "The latest in hardware, software trends, and mental health insights.",
      articleCount: 124,
      icon: "technology",
      iconBg: "#EEF2FF",
      iconColor: "#6366F1",
      popular: true,
    },
    {
      id: "ai-future",
      name: "AI & Future",
      description: "Neural networks, machine learning, and human evolution.",
      articleCount: 86,
      icon: "ai",
      iconBg: "#F5F3FF",
      iconColor: "#8B5CF6",
      popular: true,
    },
    {
      id: "business",
      name: "Business",
      description:
        "Strategies for modern startups and established enterprises.",
      articleCount: 210,
      icon: "business",
      iconBg: "#FFFBEB",
      iconColor: "#F59E0B",
      popular: true,
    },
    {
      id: "finance",
      name: "Finance",
      description: "Investment tips, market analysis, and wealth management.",
      articleCount: 95,
      icon: "finance",
      iconBg: "#EFF6FF",
      iconColor: "#3B82F6",
      popular: true,
    },
    {
      id: "health",
      name: "Health",
      description: "Holistic wellness, nutrition, and mental health insights.",
      articleCount: 158,
      icon: "health",
      iconBg: "#FFF1F2",
      iconColor: "#F43F5E",
      popular: false,
    },
    {
      id: "education",
      name: "Education",
      description: "Resources for lifelong learning and academic excellence.",
      articleCount: 72,
      icon: "education",
      iconBg: "#F0FDF4",
      iconColor: "#22C55E",
      popular: false,
    },
    {
      id: "travel",
      name: "Travel",
      description:
        "Hidden gems and comprehensive guides for the wanderlust soul.",
      articleCount: 112,
      icon: "travel",
      iconBg: "#EFF6FF",
      iconColor: "#1D4ED8",
      popular: false,
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Design your daily routine for maximum fulfillment.",
      articleCount: 230,
      icon: "lifestyle",
      iconBg: "#FAF5FF",
      iconColor: "#A855F7",
      popular: false,
    },
    {
      id: "food",
      name: "Food",
      description: "Culinary adventures, recipes, and fine dining reviews.",
      articleCount: 89,
      icon: "food",
      iconBg: "#FFF7ED",
      iconColor: "#F97316",
      popular: false,
    },
    {
      id: "sports",
      name: "Sports",
      description:
        "Comprehensive coverage of athletic events and athlete stories.",
      articleCount: 143,
      icon: "sports",
      iconBg: "#EFF6FF",
      iconColor: "#3B82F6",
      popular: false,
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Reviews of film, music, and the arts in a modern context.",
      articleCount: 167,
      icon: "entertainment",
      iconBg: "#F0FDF4",
      iconColor: "#10B981",
      popular: false,
    },
    {
      id: "motivation",
      name: "Motivation",
      description:
        "Ignite your passion and drive with inspiring thought pieces.",
      articleCount: 54,
      icon: "motivation",
      iconBg: "#FFFBEB",
      iconColor: "#EAB308",
      popular: false,
    },
  ];

  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("most-popular");
  const [loading, setLoading] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      setCategories(dummyCategories);
      setTotal(dummyCategories.length);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories();
    }, 200);
    return () => clearTimeout(timer);
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
            tech to personal motivation.
          </p>
        </div>

        {/* Search + Sort row */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative w-56">
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
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all min-w-[148px] justify-between"
              >
                <span>{selectedSortLabel}</span>
                <ChevronIcon />
              </button>

              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
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
            </div>
          </div>

          {/* Total count */}
          <div className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
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
        ) : categories.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-[15px]">No categories found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {categories.map((category) => (
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

"use client";
import CategoryCards from "@/componenets/HomeCategory";
import serverUrl from "@/utils/serverUrl";
import axios from "axios";
import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════
interface Article {
  _id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  image: string;
  link: String;
}
const tabs = ["Latest", "Most Viewed", "Most Liked"];

type CategoryData = {
  title: string;
  description: string;
  articleCount: number;
};
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// ═══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function CategoryPage() {
  const params = useParams();
  const categoryName = params?.categoryName as string;
  const [gridArticles, setGridArticles] = useState<Article[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

  const [activeTab, setActiveTab] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const pages = [1, 2, 3, "...", 12];

  const getCategoryData = async () => {
    const response = await axios.post(`${serverUrl}api/v1/each-category-data`, {
      category: categoryName,
    });

    setCategoryData(response?.data?.data);
    const articleResponse = await axios.get(
      `${serverUrl}api/v1/all-blog/${response?.data?.data?.title}`,
    );

    setGridArticles(articleResponse?.data?.data);
  };

  useEffect(() => {
    getCategoryData();
  }, []);
  return (
    <div className="min-h-screen ">
      {/* ════════════════════════════════
          HERO BANNER
      ════════════════════════════════ */}
      <div className=" bg-linear-to-br from-[#005EA3] to-[#0077CC] rounded-3xl m-8 text-white px-5 py-10 md:px-10 lg:px-16">
        <p className="text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-2">
          Category Archives
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight my-6">
          {categoryData?.title}
        </h1>
        <p className="text-sm text-blue-100 max-w-lg leading-relaxed mb-5">
          {categoryData?.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            Article Count: {categoryData?.articleCount}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            ✦ Updated Today
          </span>
        </div>
      </div>

      <div className=" px-8 mx-auto  py-6">
        {/* ════════════════════════════════
            TAB BAR
        ════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-gray-200 pb-4">
          <div className="flex gap-1 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline text-xs font-medium text-gray-400 tracking-widest uppercase">
              Sort By
            </span>
            <select className="text-xs font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option> Newest First</option>
              <option> Oldest First</option>
            </select>
          </div> */}
        </div>

        {/* ════════════════════════════════
            MAIN CONTENT + SIDEBAR
        ════════════════════════════════ */}
        <div className="  gap-8">
          {/* ── Articles Grid + List ── */}
          <div className=" space-y-10">
            {/* Grid articles (top 4) */}
            <div className=" flex flex-wrap gap-8">
              {gridArticles.length > 0 ? (
                gridArticles.map((article) => (
                  <Link
                    href={`/category/${categoryName}/${article.link}`}
                    key={article._id}
                    className="bg-white  w-[350px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="h-56 overflow-hidden">
                      <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={article?.image}
                          alt="Blog image"
                          width={200}
                          height={200}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <p className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
                        {article.category}
                      </p>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 text-3xl mb-4">
                    📚
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No articles available yet
                  </h3>

                  <p className="text-sm text-gray-500 max-w-md">
                    We’re working on adding articles to this category. Please
                    check back soon or explore other domains below.
                  </p>
                </div>
              )}
            </div>

            {/* ── Pagination ── */}
            {/* <div className="flex items-center justify-center gap-1 py-4">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </button>
              {pages.map((page, i) => (
                <button
                  key={i}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                    page === currentPage
                      ? "bg-blue-600 text-white shadow-sm"
                      : typeof page === "number"
                        ? "text-gray-500 hover:bg-gray-100"
                        : "text-gray-400 cursor-default"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
        {/* ── Explore Other Domains ── */}
        <div className="pb-4 mt-12">
          <p className="text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-5">
            Explore Other Domains
          </p>
          <CategoryCards />
        </div>

        {/* ── Newsletter CTA ── */}
        <div className="bg-[#EBE7E7] mt-24 rounded-3xl px-6 py-12 md:px-10 flex flex-col items-center text-center gap-5 relative overflow-hidden mb-8">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
          <p className="text-[10px] font-bold tracking-widest text-blue-400 uppercase relative z-10">
            The Inner Circle
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight relative z-10  w-[60%]">
            Elevate your perspective. Subscribe for latest updates.
          </h2>
          <div className="flex w-full max-w-md gap-2 relative z-10 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-white/20 text-balck placeholder-balck text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-6 py-3 bg-[#005EA3] hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
              Join The Curator
            </button>
          </div>
          <p className="text-xs text-[#707783] relative z-10">
            Join 28,000+ subscribers. No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

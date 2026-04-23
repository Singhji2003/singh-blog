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
}

const tabs = ["Latest", "Most Viewed", "Most Liked"];

function ArticleImage({ type }: { type: string }) {
  if (type === "robot")
    return (
      <div className="w-full h-full bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-20 h-20 opacity-80">
          <circle
            cx="60"
            cy="35"
            r="22"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <rect
            x="42"
            y="57"
            width="36"
            height="30"
            rx="4"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <rect
            x="28"
            y="62"
            width="12"
            height="20"
            rx="3"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.5"
          />
          <rect
            x="80"
            y="62"
            width="12"
            height="20"
            rx="3"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.5"
          />
          <circle cx="53" cy="30" r="4" fill="#22d3ee" opacity="0.7" />
          <circle cx="67" cy="30" r="4" fill="#22d3ee" opacity="0.7" />
          <line
            x1="48"
            y1="87"
            x2="48"
            y2="105"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <line
            x1="72"
            y1="87"
            x2="72"
            y2="105"
            stroke="#22d3ee"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  if (type === "web3")
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900 flex items-center justify-center">
        <div className="text-green-400  font-bold text-3xl leading-tight opacity-60 select-none text-center">
          <div>BCCON</div>
          <div>BCCON</div>
          <div>BBCON</div>
        </div>
      </div>
    );
  if (type === "ai")
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <div className="text-blue-400  font-black text-6xl opacity-60">AI</div>
      </div>
    );
  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="w-20 h-20 opacity-80">
        <circle
          cx="60"
          cy="60"
          r="30"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <circle
          cx="60"
          cy="60"
          r="15"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        <circle cx="60" cy="60" r="5" fill="#a78bfa" />
        <line
          x1="60"
          y1="15"
          x2="60"
          y2="45"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
        <line
          x1="60"
          y1="75"
          x2="60"
          y2="105"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
        <line
          x1="15"
          y1="60"
          x2="45"
          y2="60"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
        <line
          x1="75"
          y1="60"
          x2="105"
          y2="60"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

type CategoryData = {
  title: string;
  description: string;
  articleCount: number;
};
import { useParams } from "next/navigation";
import Image from "next/image";
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
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline text-xs font-medium text-gray-400 tracking-widest uppercase">
              Sort By
            </span>
            <select className="text-xs font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option> Newest First</option>
              <option> Oldest First</option>
            </select>
          </div>
        </div>

        {/* ════════════════════════════════
            MAIN CONTENT + SIDEBAR
        ════════════════════════════════ */}
        <div className="  gap-8">
          {/* ── Articles Grid + List ── */}
          <div className=" space-y-10">
            {/* Grid articles (top 4) */}
            <div className=" flex flex-wrap gap-8">
              {gridArticles.map((article) => (
                <div
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
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            <div className="flex items-center justify-center gap-1 py-4">
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
            </div>
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

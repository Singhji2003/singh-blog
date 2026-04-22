"use client";
import CategoryCards from "@/componenets/CategoryCard";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════
interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  imageType: "robot" | "web3" | "ai" | "quantum";
}

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA
// ═══════════════════════════════════════════════════════════════
const gridArticles: Article[] = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title: "The Dawn of Autonomous Robotics in Urban Logistics",
    excerpt:
      "Discover how last-mile delivery is being transformed by a new generation of sidewalk robots being deployed for dense metropolitan areas.",
    author: "Alex Rivera",
    authorInitials: "AR",
    date: "OCT 24",
    readTime: "8 MIN READ",
    imageType: "robot",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title: "Beyond the Hype: Decoupling Web3 from Speculation",
    excerpt:
      "A deep dive into the underlying protocols that are actually solving real-world data sovereignty issues without the market noise.",
    author: "Maya Chen",
    authorInitials: "MC",
    date: "OCT 22",
    readTime: "12 MIN READ",
    imageType: "web3",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title: "The AI Governance Gap: Who Regulates the Regulators?",
    excerpt:
      "As AI systems become embedded in critical infrastructure, the question of accountability becomes more urgent than ever.",
    author: "James Park",
    authorInitials: "JP",
    date: "OCT 20",
    readTime: "10 MIN READ",
    imageType: "ai",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title: "Quantum Networks: The Next Internet Frontier",
    excerpt:
      "Entanglement-based communication promises unhackable networks but the engineering challenges remain enormous.",
    author: "Sara Lin",
    authorInitials: "SL",
    date: "OCT 18",
    readTime: "9 MIN READ",
    imageType: "quantum",
  },
];

const listArticles = [
  {
    id: 5,
    title: "Quantum Supremacy: The Next Decade of Computing",
    excerpt:
      "How near-term quantum processors are already beginning to outperform classical supercomputers in niche chemical simulations.",
    author: "Dr. James Foster",
    authorInitials: "JF",
    date: "OCT 25",
    readTime: "10 MIN READ",
  },
  {
    id: 6,
    title: "The Zero Trust Paradigm: A Guide for the Future",
    excerpt:
      "Why traditional perimeter security is dead and how the 'never trust, always verify' model is securing the hybrid workforce.",
    author: "Sarah Jenkins",
    authorInitials: "SJ",
    date: "OCT 11",
    readTime: "14 MIN READ",
  },
];

const popularPosts = [
  {
    num: "01",
    title: "The Ethics of Sustainable Tech Architecture",
    reads: "4.8k reads",
  },
  {
    num: "02",
    title: "The Future of Wearable Health Sensors",
    reads: "3.6k reads",
  },
];

const topCategories = [
  { name: "Artificial Intelligence", count: 42 },
  { name: "Cybersecurity", count: 28 },
  { name: "Cloud Computing", count: 19 },
];

const popularTags = [
  "React",
  "AI",
  "Fintech",
  "UX Design",
  "Free Energy",
  "Python",
];

const tabs = ["Latest", "Most Viewed", "Most Liked"];

const domains = [
  {
    name: "AI & Intelligence",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6 text-blue-500"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        <path
          d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Health & Wellness",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6 text-blue-500"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Career Strategy",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6 text-blue-500"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Finance & Wealth",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6 text-blue-500"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════
//  SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Avatar({ initials, name }: { initials: string; name: string }) {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-violet-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

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

// ═══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const pages = [1, 2, 3, "...", 12];

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
          Technology
        </h1>
        <p className="text-sm text-blue-100 max-w-lg leading-relaxed mb-5">
          Exploring the frontiers of innovation, from decentralized networks and
          artificial intelligence to the ethical frameworks shaping our digital
          tomorrow.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            108 Articles
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Articles Grid + List ── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Grid articles (top 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gridArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="h-44 overflow-hidden">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                      <ArticleImage type={article.imageType} />
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
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Avatar
                        initials={article.authorInitials}
                        name={article.author}
                      />
                      <span className="text-xs text-gray-500">
                        {article.author}
                      </span>
                      <span className="text-gray-300 text-xs">·</span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {article.date}
                      </span>
                      <span className="text-gray-300 text-xs">·</span>
                      <span className="text-[10px] text-gray-400">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* List articles (next 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {listArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Avatar
                      initials={article.authorInitials}
                      name={article.author}
                    />
                    <span className="text-xs text-gray-500">
                      {article.author}
                    </span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {article.date}
                    </span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-[10px] text-gray-400">
                      {article.readTime}
                    </span>
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

          {/* ════════════════════════════════
              SIDEBAR
          ════════════════════════════════ */}
          <aside className="flex flex-col gap-5">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search technology..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#EBE7E7] border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-0.5 bg-blue-500" />
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Popular Posts
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {popularPosts.map((post) => (
                  <div
                    key={post.num}
                    className="flex gap-3 items-start cursor-pointer group"
                  >
                    <span className="text-2xl font-black text-gray-100 leading-none select-none">
                      {post.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {post.reads}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-0.5 bg-blue-500" />
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Top Categories
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {topCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-0.5 bg-blue-500" />
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Popular Tags
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 text-xs rounded-full cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Subscribe Widget */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Curated Tech Insights
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Weekly breakthroughs delivered to your inbox.
                  </p>
                </div>
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg bg-white/80 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                Subscribe Now
              </button>
            </div>
          </aside>
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

// Footer.tsx
// Place in your Next.js `components/` directory.
// Requires Tailwind CSS (v3+). No extra dependencies needed.

import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import RssFeedSharpIcon from "@mui/icons-material/RssFeedSharp";

// ── Data ─────────────────────────────────────────────────────────────────────

const platformLinks = [
  { label: "Editorial Policy", href: "#", underline: true },
  { label: "Privacy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Authors", href: "#" },
  { label: "Masthead", href: "#" },
];

const categoryLinks = [
  { label: "Technology", href: "/category/technology" },
  { label: "Health", href: "/category/health" },
  { label: "Lifestyle", href: "/category/lifestyle" },
  { label: "Education", href: "/category/education" },
  { label: "Sports", href: "/category/sports" },
];

const latestFeed = [
  {
    title: "The Future of Silicon Valley: Post-AI Boom",
    time: "2 HOURS AGO",
    href: "#",
  },
  {
    title: "Carbon Capture: Engineering Our Way Out",
    time: "YESTERDAY",
    href: "#",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#f5f0eb] w-full mt-24 font-sans">
      {/* Top section */}
      <div className="  mx-auto p-12 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 – Brand */}
          <div className="flex flex-col gap-4">
            <Image src={Logo} className="w-42" alt="Logo" />

            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
              A premium editorial destination for curious minds. We curate the
              signals from the noise.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-1 text-gray-500">
              <button
                aria-label="Share"
                className="hover:text-gray-800 transition-colors"
              >
                <ShareSharpIcon />
              </button>
              <button
                aria-label="Website"
                className="hover:text-gray-800 transition-colors"
              >
                <LanguageSharpIcon />
              </button>
              <button
                aria-label="RSS"
                className="hover:text-gray-800 transition-colors"
              >
                <RssFeedSharpIcon />
              </button>
            </div>
          </div>

          {/* Col 2 – Platform */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              Platform
            </p>
            {platformLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm text-gray-600 hover:text-gray-900 transition-colors w-fit  hover:underline`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3 – Categories */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              Categories
            </p>
            {categoryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:underline hover:text-gray-900 transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 4 – Latest from Feed */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              Latest from Feed
            </p>
            {latestFeed.map((item) => (
              <div key={item.title} className="flex flex-col gap-1">
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors leading-snug"
                >
                  {item.title}
                </Link>
                <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Bottom copyright */}
      <div className="max-w-6xl mx-auto px-6 py-5 text-center">
        <p className="text-sm text-gray-400">
          © 2026 Singh Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

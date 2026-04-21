// Footer.tsx
// Place in your Next.js `components/` directory.
// Requires Tailwind CSS (v3+). No extra dependencies needed.

import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";

// ── Icon components ──────────────────────────────────────────────────────────

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function RssIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const platformLinks = [
  { label: "Editorial Policy", href: "#", underline: true },
  { label: "Privacy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Authors", href: "#" },
  { label: "Masthead", href: "#" },
];

const categoryLinks = [
  { label: "Technology", href: "#" },
  { label: "Economics", href: "#" },
  { label: "Philosophy", href: "#" },
  { label: "Design", href: "#" },
  { label: "Science", href: "#" },
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
                <ShareIcon />
              </button>
              <button
                aria-label="Website"
                className="hover:text-gray-800 transition-colors"
              >
                <GlobeIcon />
              </button>
              <button
                aria-label="RSS"
                className="hover:text-gray-800 transition-colors"
              >
                <RssIcon />
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

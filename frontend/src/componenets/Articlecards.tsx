// ArticleCards.tsx
// Place this file in your Next.js `components/` or `app/` directory.
// Requires Tailwind CSS (v3+). No extra dependencies needed.

import Image, { StaticImageData } from "next/image";
import Philosphy from "@/assets/images/Philosphy.png";
import MenuBookSharpIcon from "@mui/icons-material/MenuBookSharp";
import EnergySavingsLeafSharpIcon from "@mui/icons-material/EnergySavingsLeafSharp";
import Link from "next/link";
interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
  author: string;
  authorIcon?: "book" | "shield";
  variant: "image" | "navy" | "amber";
  imageSrc?: StaticImageData;
  cta?: string;
  link?: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: "PHILOSOPHY",
    title: "Stoicism in the Age of Outrage",
    description:
      "How ancient wisdom provides the ultimate mental framework for navigating modern digital discourse.",
    author: "Keep Alive",
    authorIcon: undefined,
    variant: "image",
    imageSrc: Philosphy, // replace with your image path
    cta: "Keep Alive",
    link: "/category/philosophy",
  },
  {
    id: 2,
    category: "INNOVATION",
    title: "The 10–Year Web Strategy",
    description:
      "Building platforms that stand the test of time in an era of ephemeral content.",
    author: "By Editorial Staff",
    authorIcon: "book",
    variant: "navy",
    link: "/category/philosophy",
  },
  {
    id: 3,
    category: "SUSTAINABILITY",
    title: "Green Code: Efficient Architecture",
    description:
      "How small changes in your server logic can drastically reduce your digital carbon footprint.",
    author: "By Sustainable Dev Group",
    authorIcon: "shield",
    variant: "amber",
    link: "/category/philosophy",
  },
];

// ── Card sub-components ──────────────────────────────────────────────────────

function AuthorRow({
  icon,
  author,
  light = false,
}: {
  icon?: "book" | "shield";
  author: string;
  light?: boolean;
}) {
  const color = light ? "text-white/70" : "text-white/70";
  return (
    <div className={`flex items-center gap-2 text-sm ${color}`}>
      {icon === "book" && (
        <MenuBookSharpIcon className="w-4 h-4 flex-shrink-0" />
      )}
      {icon === "shield" && (
        <EnergySavingsLeafSharpIcon className="w-4 h-4 flex-shrink-0" />
      )}
      <span>{author}</span>
    </div>
  );
}

// Card 1 – full bleed image with dark overlay
function ImageCard({ article }: { article: Article }) {
  return (
    <Link href={article.link || ""}>
      <div className="relative rounded-2xl overflow-hidden h-full min-h-[380px] sm:min-h-[420px]">
        {/* background image – swap src for a real image */}
        <div className="absolute inset-0">
          {article.imageSrc ? (
            <Image
              src={article.imageSrc}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Content */}
        <div className="relative h-full flex text-left flex-col justify-end p-7 gap-3">
          <p className="text-xs font-semibold  tracking-widest text-white/60 uppercase">
            {article.category}
          </p>
          <h2 className="text-3xl font-bold text-white leading-tight">
            {article.title}
          </h2>
          <p className="text-sm text-white/70 leading-relaxed">
            {article.description}
          </p>
          {article.cta && (
            <button className="mt-2 self-start px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
              {article.cta}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

// Card 2 & 3 – solid colour cards
function SolidCard({
  article,
  bg,
  accent,
}: {
  article: Article;
  bg: string;
  accent: string;
}) {
  return (
    <Link
      href={article.link || ""}
      className={`relative rounded-2xl overflow-hidden ${bg} p-7 flex flex-col   justify-center gap-4 min-h-[250px]`}
    >
      {/* Decorative blob */}
      <div
        className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full ${accent} opacity-30`}
      />

      <div className="flex flex-col gap-3 text-left relative z-10">
        <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
          {article.category}
        </p>
        <h2 className="text-2xl font-bold text-white leading-snug">
          {article.title}
        </h2>
        <p className="text-sm text-white/70 leading-relaxed">
          {article.description}
        </p>
      </div>

      <div className="relative z-10">
        <AuthorRow icon={article.authorIcon} author={article.author} />
      </div>
    </Link>
  );
}

// ── Main exported component ──────────────────────────────────────────────────

export default function ArticleCards() {
  const [imageArticle, ...solidArticles] = articles;

  return (
    <section className="w-full   mx-auto  py-10 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left – tall image card spanning both rows on md+ */}
        <div className="md:row-span-2">
          <ImageCard article={imageArticle} />
        </div>

        {/* Right – two stacked solid cards */}
        <SolidCard
          article={solidArticles[0]}
          bg="bg-[#1a2744]"
          accent="bg-[#2a3a6a]"
        />
        <SolidCard
          article={solidArticles[1]}
          bg="bg-[#c47d1e]"
          accent="bg-[#e09030]"
        />
      </div>
    </section>
  );
}

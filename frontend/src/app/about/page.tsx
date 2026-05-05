// AboutSections.tsx
// Drop this into your Next.js app/pages directory or import into any page.
// Requires: Tailwind CSS, lucide-react (optional — using SVG inline icons instead for zero-dep)

import Link from "next/link";
import React from "react";
import AboutImg from "@/assets/images/about.png";
import Image, { StaticImageData } from "next/image";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PhonelinkSharpIcon from "@mui/icons-material/PhonelinkSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import ArpanImg from "@/assets/images/arpan.jpeg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  title: string;
  bio: string;
  avatar: StaticImageData;
  email: string;
}

interface Category {
  label: string;
  icon: React.ReactNode;
  id: string;
}

interface Mission {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StoryMilestone {
  number: string;
  year: string;
  description: string;
}

// ─────────────────────────────────────────────
// Section 1 – Hero / Vision
// ─────────────────────────────────────────────
const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden bg-[#dce8f5] py-28 px-6 text-center">
    {/* subtle grid texture */}
    <div
      className="pointer-events-none absolute inset-0 opacity-10"
      style={{
        background: "linear-gradient(114.82deg, #005EA3 0%, #0077CC 100%)",
        backgroundSize: "32px 32px",
      }}
    />

    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#005EA3]">
      Our Vision
    </p>

    <h1 className="mx-auto   text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
      About Our <span className="text-[#005EA3]">Blog Platform</span>
    </h1>

    <p className="mx-auto mt-5 max-w-xl text-base text-gray-600 leading-relaxed">
      The Curator is a premium gallery for thought leadership, dedicated to
      sharing quality knowledge and fostering professional growth through
      curated editorial content.
    </p>

    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Link
        href={"/category"}
        className="rounded-md cursor-pointer bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white  transition hover:bg-blue-700   shadow-[0px_8px_10px_-6px_#005EA333,0px_20px_25px_-5px_#005EA333]"
      >
        Explore Blogs
      </Link>
      <button className="rounded-md cursor-pointer border border-gray-300 bg-[#ffffffab] hover:bg-[#ffffff] px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition    ">
        Our Approach
      </button>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 2 – Mission pillars + What We Publish
// ─────────────────────────────────────────────

const missions: Mission[] = [
  {
    icon: <LibraryBooksOutlinedIcon />,
    title: "Sharing Quality Knowledge",
    description:
      "We curate only the most impactful insights, ensuring every read adds value to your professional and personal life.",
  },
  {
    icon: <SchoolOutlinedIcon />,
    title: "Making Learning Accessible",
    description:
      "Complex topics simplified. Our editorial team works to make high-level concepts easy to digest for everyone.",
  },
  {
    icon: <CheckCircleOutlineOutlinedIcon />,
    title: "Providing Reliable Content",
    description:
      "Fact-checked, peer-reviewed, and deeply researched. We prioritize accuracy above everything else.",
  },
];

const categories: Category[] = [
  { label: "Technology", icon: <PhonelinkSharpIcon />, id: "technology" },
  { label: "AI", icon: <LightModeSharpIcon />, id: "ai-future" },
  { label: "Health", icon: <FavoriteSharpIcon />, id: "health" },
  { label: "Lifestyle", icon: <AccessTimeSharpIcon />, id: "lifestyle" },
  { label: "Education", icon: <SchoolSharpIcon />, id: "education" },
  { label: "Finance", icon: <MonetizationOnSharpIcon />, id: "finance" },
  { label: "Motivation", icon: <BoltSharpIcon />, id: "motivation" },
];

const MissionSection: React.FC = () => (
  <section className="bg-[#f5f5f0] pt-4 md:px-16 px-8 pb-24  ">
    {/* Our Story sub-section */}
    <div className="mx-auto mt-10 flex  flex-col items-center gap-10 lg:flex-row lg:items-center lg:text-left">
      {/* Text */}
      <div className="flex-1  ">
        <h2 className="text-3xl mt-2 font-bold ">Our Story</h2>
        <p className="mt-3 w-[80%] md:text-base text-sm text-gray-600 leading-relaxed">
          What started as a simple vision to filter the noise of the digital age
          has grown into a sophisticated platform for the curious mind. We
          believe in depth over speed, and insight over information.
        </p>

        <ol className="mt-6 space-y-4">
          {(
            [
              {
                number: "01",
                year: "The Genesis (2022)",
                description:
                  "Founded with the mission to elevate blogging to an art form.",
              },
              {
                number: "02",
                year: "Growth & Scale (2023)",
                description:
                  "Expanding our network to include 100+ expert contributors.",
              },
            ] as StoryMilestone[]
          ).map((m) => (
            <li key={m.number} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-600">
                {m.number}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{m.year}</p>
                <p className="text-sm text-gray-500">{m.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Illustration card */}
      <Image src={AboutImg} alt="About" className="rounded-2xl w-[320px]" />
    </div>

    {/* Mission pillars */}
    <div className="mx-auto grid  mt-24 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {missions.map((m) => (
        <div
          key={m.title}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
        >
          <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {m.icon}
          </span>
          <h3 className="text-base font-bold text-gray-900">{m.title}</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {m.description}
          </p>
        </div>
      ))}
    </div>

    {/* What We Publish */}
    <div className="mx-auto mt-24">
      <h2 className="text-3xl mt-2 font-bold ">What We Publish</h2>
      <p className="mt-1 text-sm md:text-base text-gray-500">
        Diverse perspectives across the most influential sectors of the modern
        era.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.map((cat) => (
          <Link
            href={`/category/${cat.id}`}
            key={cat.label}
            className="flex flex-col cursor-pointer items-center gap-2 rounded-2xl bg-white py-5 px-4 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-[#005EA3]"
          >
            <span className="text-gray-600">{cat.icon}</span>
            <span className="text-sm font-medium text-gray-700">
              {cat.label}
            </span>
          </Link>
        ))}

        {/* See More tile */}
        <Link
          href={"/category"}
          className="flex flex-col cursor-pointer items-center gap-2 rounded-2xl bg-blue-600 py-5 px-4 shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#005EA3] focus:ring-offset-2"
        >
          <AddOutlinedIcon htmlColor={"#ffff"} />
          <span className="text-sm font-semibold text-white">See More</span>
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 3 – Why Readers Trust Us + Team
// ─────────────────────────────────────────────

const trustPoints = [
  {
    icon: <VerifiedOutlinedIcon />,
    color: "bg-blue-100 text-blue-600",
    title: "Expert Contributors",
    description:
      "Articles written by industry veterans and recognized thought leaders.",
  },
  {
    icon: <ManageSearchOutlinedIcon />,
    color: "bg-purple-100 text-purple-600",
    title: "Well-Researched Articles",
    description:
      "Every claim is backed by data and cross-referenced with primary sources.",
  },
  {
    icon: <SaveAsOutlinedIcon />,
    color: "bg-orange-100 text-orange-600",
    title: "Reader-Focused Writing",
    description:
      "Our prose is crafted for clarity and impact, valuing your time as a reader.",
  },
];

const team: TeamMember[] = [
  {
    name: "Arpan Singh",
    role: "FOUNDER ",
    title: "Founde ",
    bio: "Over 2 years in digital journalism and editorial strategy. Passionate about ethical media.",
    avatar: ArpanImg,
    email: "arpansinghrajput123@gmail.com",
  },
];

const TrustSection: React.FC = () => (
  <section className="bg-white py-16 px-12">
    {/* Why Readers Trust Us */}
    <div className="mx-auto   text-center">
      <h2 className="text-3xl mt-2 font-bold ">Why Readers Trust Us</h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {trustPoints.map((tp) => (
          <div
            key={tp.title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full ${tp.color}`}
            >
              {tp.icon}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{tp.title}</h3>
            <p className="text-base text-gray-500 leading-relaxed max-w-xs mx-auto">
              {tp.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* The Minds Behind The Curator */}
    {/* <div className="mx-auto mt-24">
      <h2 className="text-3xl mt-2 font-bold text-center ">
        The Minds Behind The Curator
      </h2>

      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {team.map((member) => (
          <div
            key={member.name}
            className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 text-center transition hover:shadow-md"
          >
           

            <Image
              src={member.avatar}
              alt="Image"
              className="rounded-full w-[100px] mx-auto"
            />

            <h3 className="mt-4 text-base font-bold text-gray-900">
              {member.name}
            </h3>
            <p className="mt-0.5 text-xs font-semibold tracking-widest text-[#005EA3] uppercase">
              {member.role}
            </p>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              {member.bio}
            </p>
   <div className="mt-5 flex items-center justify-center gap-4 text-gray-400">
              <a
                href={`mailto:${member.email}`}
                aria-label="Email"
                className="transition hover:text-[#005EA3]"
              >
                <EmailOutlinedIcon />
              </a>
              <button
                aria-label="Share"
                className="transition hover:text-[#005EA3]"
              >
                <ShareOutlinedIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div> */}
  </section>
);

const CommunitySection: React.FC = () => {
  return (
    <section className="bg-[#F6F3F2] py-24 mt-8   mx-auto">
      <h2 className="md:text-3xl text-xl mt-2 font-bold text-center ">
        Ready to Expand Your Horizon?
      </h2>
      <div className="mt-8 flex   items-center justify-center gap-6">
        <Link
          href={"/category"}
          className="rounded-xl cursor-pointer bg-blue-600 md:px-10 px-4 py-4 text-base font-semibold text-white  transition hover:bg-blue-700   shadow-[0px_8px_10px_-6px_#005EA333,0px_20px_25px_-5px_#005EA333]"
        >
          Start Reading
        </Link>
        <Link
          href={"/category"}
          className="rounded-xl cursor-pointer border border-gray-300 bg-[#ffffffab] hover:bg-[#ffffff]  md:px-10 px-4 py-4 text-base font-semibold text-gray-700 shadow-sm transition    "
        >
          Explore Categories
        </Link>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Default export – compose all three sections
// ─────────────────────────────────────────────
const AboutPage: React.FC = () => (
  <main className="min-h-screen ">
    {/* Section 3 from screenshot order — hero is at top */}
    <HeroSection />
    <MissionSection />
    <TrustSection />
    <CommunitySection />
  </main>
);

export default AboutPage;
